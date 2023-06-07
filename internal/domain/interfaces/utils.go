package interfaces

type Hasher interface {
	HashString(password string) (string, error)
	CheckHash(password, hash string) error
}

type Sessioner interface {
	NewToken() (string, error)
}
