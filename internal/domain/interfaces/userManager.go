package interfaces

type UserManager interface {
	Register()
	Login()
	CheckSession()
	LoadOnlineUsers()
	SubscribeOnlineUsersUpdates()
}
