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
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	handlers "real-time-forum/internal/adapters/primary/http"
	ws "real-time-forum/internal/adapters/primary/ws"
	"real-time-forum/internal/application/services"
	"text/template"
)

var ( //move to pkg config??
	//repo        = flag.String("db", "postgres", "Database for storing messages")
	//host   = "localhost:6379"
	httpHandler      *handlers.HTTPHandler
	templateCache    *template.Template
	messengerService *services.MessengerService
	authService      *services.AuthService
	userManager      *services.UserManagerService
)

func main() {
	rootCtx := context.Background()
	ctx, cancel := context.WithCancel(rootCtx)

	defer cancel()

	// templateCache = cacheTemplate("../../templates/")

	// store, err := database.NewDatabase("../../db/database.db")
	// if err != nil {
	// 	log.Fatalln("Error with database: ", err)
	// 	os.Exit(1)
	// }

	// messengerService = services.NewMessengerService(store)
	// authService = services.NewAuthService(store)
	// userManager = services.NewUserManagerService(store)
	// handler := handlers.NewHTTPHandler(*authService, *messengerService, *userManager)

	//http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../../templates/static"))))
	http.HandleFunc("/", indexHandler)
	// http.HandleFunc("/login", handler.LoginHandler)
	// http.HandleFunc("/register", handler.RegisterHandler)
	// http.HandleFunc("/ws", handler.ServeWS)

	manager := ws.NewManager(ctx)

	// Serve the ./frontend directory at Route /
	//http.Handle("/", http.FileServer(http.Dir("./frontend")))
	http.HandleFunc("/login", manager.LoginHandler)
	http.HandleFunc("/ws", manager.ServeWS)

	http.HandleFunc("/debug", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, len(manager.Clients))
	})

	log.Println("Starting server on: http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if errors.Is(err, http.ErrServerClosed) {
		log.Fatalln("Server stopped: ", err)
		os.Exit(1)
	} else if err != nil {
		log.Fatalln("Error starting server: ", err)
		os.Exit(1)
	}
}
func indexHandler(w http.ResponseWriter, r *http.Request) {
	//html, err := ioutil.ReadFile("../../templates/index.html")
	html, err := ioutil.ReadFile("../../templates/test.html")
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
