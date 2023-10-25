import React from 'react';
import { useHistory } from 'react-router-dom'
import '../../styles/TruckBtn.scss'
import { gsap } from "gsap";
import { useSelector } from 'react-redux';
import { paths } from '../../untils/constant';

const TruckBtn = (probs) => {
    const history = useHistory()
    const subLang = useSelector(state => state.lang.TruckBtn)
    const user = useSelector(state => state.user)
    function onClickLogin(e) {
        let button = e.target.parentNode;

        e.preventDefault();

        if (user.isLoggedIn) {
            history.push(paths.SYSTEM)
            return
        } else {
            history.push(paths.LOGIN)
            return
        }

        let box = button.querySelector('.box'),
            truck = button.querySelector('.truck');

        if (!button.classList.contains('done')) {

            if (!button.classList.contains('animation')) {

                button.classList.add('animation');

                gsap.to(button, {
                    '--box-s': 1,
                    '--box-o': 1,
                    duration: .3,
                    delay: .5
                });

                gsap.to(box, {
                    x: 0,
                    duration: .4,
                    delay: .7
                });

                gsap.to(button, {
                    '--hx': -5,
                    '--bx': 50,
                    duration: .18,
                    delay: .92
                });

                gsap.to(box, {
                    y: 0,
                    duration: .1,
                    delay: 1.15
                });

                gsap.set(button, {
                    '--truck-y': 0,
                    '--truck-y-n': -26
                });

                gsap.to(button, {
                    '--truck-y': 1,
                    '--truck-y-n': -25,
                    duration: .2,
                    delay: 1.25,
                    onComplete() {
                        gsap.timeline({
                            onComplete() {
                                button.classList.add('done');
                                button.style.background = 'none';
                                redirectToLoginPage()
                            }
                        }).to(truck, {
                            x: 0,
                            duration: .4
                        }).to(truck, {
                            x: 40,
                            duration: 1
                        }).to(truck, {
                            x: 20,
                            duration: .6
                        }).to(truck, {
                            x: 96,
                            duration: .4
                        });
                        gsap.to(button, {
                            '--progress': 1,
                            duration: 2.4,
                            ease: "power2.in"
                        });
                    }
                });
            }
        } else {
            button.classList.remove('animation', 'done');
            gsap.set(truck, {
                x: 4
            });
            gsap.set(button, {
                '--progress': 0,
                '--hx': 0,
                '--bx': 0,
                '--box-s': .5,
                '--box-o': 0,
                '--truck-y': 0,
                '--truck-y-n': -26
            });
            gsap.set(box, {
                x: -24,
                y: -6
            });
        }
    }

    function redirectToLoginPage() {
        history.push(paths.LOGIN)
    }

    return (
        <button className="truck-button loginBtn" onClick={onClickLogin}>
            <span className="default">{user.isLoggedIn ? subLang.system : subLang.login}</span>
            <span className="success">
                Success
                <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
            </span>
            <div className="truck">
                <div className="wheel"></div>
                <div className="back"></div>
                <div className="front"></div>
                <div className="box"></div>
            </div>
        </button>
    )
}

export default TruckBtn