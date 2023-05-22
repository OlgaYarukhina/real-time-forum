// handle for concrete url X
// use concrete middleware from pkg/middleware
// use service from internal/domain/services to do logic
package httpadpt

import (
	"real-time-forum/internal/domain/interfaces"
)

type HttpAdapter struct {
	authService interfaces.Auther
}

func New(authService interfaces.Auther) *HttpAdapter {
	return &HttpAdapter{
		authService: authService,
		//messengerService:   messenger,
		//userManagerService: userManager,
		//services
	}
}
