//setup server
//use settings from pkg/config
//add handlers from internal/adapters/handlers
//prepare and connect with database from db with access through interface
//db interface from internal/interfaces
//run server

package main

import (
	"errors"
	"log"
	"net/http"
	"os"
	"real-time-forum/internal/adapters/database"
	"real-time-forum/internal/adapters/handlers"
	"real-time-forum/internal/core/services"
	"text/template"
)

var ( //move to pkg config??
	//repo        = flag.String("db", "postgres", "Database for storing messages")
	//host   = "localhost:6379"
	httpHandler      *handlers.HTTPHandler
	templateCache    *template.Template
	messengerService *services.MessengerService
)

func main() {
	templateCache = cacheTemplate("../../templates/")

	store := database.NewDatabase()
	messengerService = services.NewMessengerService(store)
	handler := handlers.NewHTTPHandler(*messengerService)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", handler.TestMiddleware(handler.TestHandler))

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

//move to pkg??
func cacheTemplate(dir string) *template.Template {
	t, err := template.ParseFiles(dir + "index.html")
	if err != nil {
		log.Fatalln(err)
		os.Exit(1)
	}
	return t
}
