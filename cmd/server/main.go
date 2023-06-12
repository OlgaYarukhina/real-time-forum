//setup server
//use settings from pkg/config
//add handlers from internal/adapters/handlers
//prepare and connect with database from db with access through interface
//db interface from internal/interfaces
//run server

package main

import (
	"context"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"real-time-forum/internal/adapters/secondary/database"
	"real-time-forum/internal/application/services"
	"real-time-forum/internal/domain/helpers"
	"real-time-forum/pkg/utils"
	"text/template"

	httpadpt "real-time-forum/internal/adapters/primary/http"
	wsadpt "real-time-forum/internal/adapters/primary/ws"
)

var ( //move to pkg config??
	//repo        = flag.String("db", "postgres", "Database for storing messages")
	//host   = "localhost:6379"
	httpAdapter   *httpadpt.HttpAdapter
	templateCache *template.Template
	//messengerService *services.MessengerService
	authService  *services.AuthService
	postsService *services.PostsService
	//userManager      *services.UserManagerService
)

//keep in main only app create function call?
func main() {
	rootCtx := context.Background()
	ctx, cancel := context.WithCancel(rootCtx)

	defer cancel()

	// templateCache = cacheTemplate("../../templates/")

	store, err := database.NewDatabase("../../db/database.db")
	if err != nil {
		log.Fatalln("Error with database: ", err)
		os.Exit(1)
	}

	//messengerService = services.NewMessengerService(store)
	authService = services.NewAuthService(store, utils.NewHasher(), utils.NewUuidSessioner())
	postsService = services.NewPostService(store)
	//userManager = services.NewUserManagerService(store)
	handler := httpadpt.New(*authService, *postsService)

	// TODO : add ws connection removing
	sessionCleaner := helpers.NewSessionCleaner(store)
	sessionCleaner.StartCleaningSessions(60 * time.Minute)

	_ = wsadpt.New(ctx)

	// TODO : add middleware
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../../web/static"))))
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/api/posts", handler.SessionCheck(handler.ViewPostsHandler))
	http.HandleFunc("/api/post", handler.ViewPostHandler)
	http.HandleFunc("/api/login", handler.LoginHandler)
	http.HandleFunc("/api/register", handler.RegisterHandler)
	http.HandleFunc("/api/create_post", handler.SessionCheck(handler.CreatePostHandler))
	http.HandleFunc("/api/create_comment", handler.SessionCheck(handler.CreateCommentHandler))
	//do not delete! plz
	//http.HandleFunc("/ws", handler.SessionCheck(manager.ServeWS))
	http.HandleFunc("/api/logout", handler.SessionCheck(handler.LogoutHandler))

	http.HandleFunc("/debug", func(w http.ResponseWriter, r *http.Request) {
		//fmt.Fprint(w, len(manager.Clients))
	})

	log.Println("Starting server on: http://localhost:8080/login")
	err = http.ListenAndServe(":8080", nil)
	if errors.Is(err, http.ErrServerClosed) {
		log.Fatalln("Server stopped: ", err)
		os.Exit(1)
	} else if err != nil {
		log.Fatalln("Error starting server: ", err)
		os.Exit(1)
	}
}
func indexHandler(w http.ResponseWriter, r *http.Request) {
	html, err := ioutil.ReadFile("../../web/index.html")

	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write(html)
}

//move to pkg??
func cacheTemplate(dir string) *template.Template {
	t, err := template.ParseFiles(dir + "index.html")
	if err != nil {
		log.Fatalln(err)
		os.Exit(1)
	}
	return t
}
