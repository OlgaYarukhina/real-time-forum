package utils

import "real-time-forum/internal/domain/entities"

//"regexp"
//"strconv"

var (
// rxNickname  = regexp.MustCompile(`^[a-zA-Z0-9_]{4,10}$`)
// rxAge       = regexp.MustCompile(`^(1[89]|[2-9][0-9])$`)
// rxFirstName = regexp.MustCompile(`^[a-zA-Z]{2,20}$`)
// rxLastName  = regexp.MustCompile(`^[a-zA-Z]{2,20}$`)
// rxEmail     = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
// rxPassword  = regexp.MustCompile(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$`)
)

func ValidateFormData(user entities.User) map[string]string {
	errorsCaught := make(map[string]string)

	// if !rxNickname.MatchString(user.Nickname) {
	// 	errorsCaught["nickname"] = "Nickname must be alphanumeric and between 4-10 characters"
	// }

	// if !rxAge.MatchString(strconv.Itoa(user.Age)) {
	// 	errorsCaught["age"] = "Age must be between 18-99"
	// }

	// if !rxFirstName.MatchString(user.FirstName) {
	// 	errorsCaught["firstname"] = "Firstname must contain only letters and be between 2-20 characters"
	// }

	// if !rxLastName.MatchString(user.LastName) {
	// 	errorsCaught["lastname"] = "Lastname must contain only letters and be between 2-20 characters"
	// }

	// if !rxEmail.MatchString(user.Email) {
	// 	errorsCaught["email"] = "Email is invalid"
	// }

	// if !rxPassword.MatchString(string(user.PasswordHash)) {
	// 	errorsCaught["password"] = "Password must be between 6-12 characters and contain at least one lowercase letter, one uppercase letter, and one digit"
	// }

	return errorsCaught
}

/*

package utils

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

func FormsVerification(user entities.User) map[string]string {
	errorsCaught := make(map[string]string)
	return errorsCaught
}


*/
