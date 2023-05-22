package interfaces

type Hasher interface {
	HashPassword(password string) (string, error)
	CheckPasswordHash(password, hash string) bool
}

type Sessioner interface {
	NewToken() (string, error)
}
