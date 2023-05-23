package interfaces

type Hasher interface {
	HashPassword(password string) (string, error)
	CheckPasswordHash(password, hash string) error
}

type Sessioner interface {
	NewToken() (string, error)
}
