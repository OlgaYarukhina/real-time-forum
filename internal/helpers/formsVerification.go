package helpers

import (
	"real-time-forum/internal/core/entities"
	"regexp"
)

var rxNickname = regexp.MustCompile(`.{4,10}`)
var rxAge = regexp.MustCompile(``)
var rxFirstname = regexp.MustCompile(``)
var rxLastname = regexp.MustCompile(``)
var rxEmail = regexp.MustCompile(`.+@.+\..+`)
var rxPassword = regexp.MustCompile(`.{6,12}`)

func FormsVerification (user entities.User) map[string]string {
	errorsCaught := make(map[string]string)



return errorsCaught
}