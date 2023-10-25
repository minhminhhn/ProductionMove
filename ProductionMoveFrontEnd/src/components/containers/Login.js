import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../store/slices/userSlices"
import '../../styles/Login.scss'
import { paths } from '../../untils/constant'

const Login = (probs) => {
    const userNameRef = useRef()
    const passwordRef = useRef()
    const [errMess, setErrMess] = useState('')
    const [isLogging, setIsLogging] = useState(false)
    const dispatch = useDispatch()
    const subLang = useSelector(state => state.lang.Login)

    const onCLickLoginButton = (e) => {
        e.preventDefault()
        setErrMess('')
        dispatch(loginUser({
            userName: userNameRef.current.value,
            password: passwordRef.current.value
        })).catch((mess) => {
            setErrMess(mess.message)
        })
    }

    const onFocusInput = (e) => {
        setErrMess('')
        const target = e.target
        const length = target.value.length
        target.setSelectionRange(0, length)
    }

    const onPressKeyDown = (e) => {
        switch (e.code) {
            case 'Enter':
                e.preventDefault()
                if (e.target === userNameRef.current) {
                    passwordRef.current.focus()
                    return
                }
                if (e.target === passwordRef.current) {
                    onCLickLoginButton(e)
                }
                break
            case 'ArrowUp':
                if (e.target === passwordRef.current) {
                    userNameRef.current.focus()
                }
                break
            case 'ArrowDown':
                if (e.target === userNameRef.current) {

                    passwordRef.current.focus()
                }
                break
        }

    }

    function turnBack() {
        probs.history.push(paths.HOME)
    }

    useEffect(() => {
        userNameRef.current.focus()
    })

    return (
        <div className="page-white">
            <div className="login">
                <form className="login-form" action="" method="post">
                    <h1 className="text">{subLang.welcome}</h1>
                    <div className="input-container">
                        <input
                            type="text"
                            className="input-box"
                            placeholder={subLang.userName}
                            ref={userNameRef} required
                            onKeyDown={(e) => onPressKeyDown(e)}
                            onFocus={(e) => onFocusInput(e)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            className="input-box"
                            placeholder={subLang.password}
                            ref={passwordRef} required
                            onKeyDown={(e) => onPressKeyDown(e)}
                            onFocus={(e) => onFocusInput(e)}
                        />
                    </div>
                    <span>{errMess}</span>
                    <div className="button-container">
                        <input type="submit" content="Login" value={subLang.login} onClick={(e) => onCLickLoginButton(e)} />
                    </div>
                    <div className="backBtn">
                        <img src="/backBtn.png" alt="return" onClick={() => turnBack()} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login