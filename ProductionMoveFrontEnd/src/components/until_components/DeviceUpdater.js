import React, { useEffect, useLayoutEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateSize, updateScroll, updateType } from "../../store/slices/deviceSlice"

const DeviceUpdater = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const updateWH = () => {
            dispatch(updateSize({
                width: window.innerWidth,
                height: window.innerHeight
            }))
            const type = {
                isMobie: false,
                isDesktop: false,
                isTablet: false,
            }
            if (window.innerWidth < 740) {
                type.isMobie = true
            } else if (window.innerWidth < 1024) {
                type.isTablet = true
            } else {
                type.isDesktop = true
            }
            dispatch(updateType(type))
        }
        window.addEventListener('resize', updateWH)

        function updateS() {
            dispatch(updateScroll({
                X: window.scrollX,
                Y: window.scrollY
            }))
        }
        window.addEventListener('scroll', updateS)
        return () => {
            window.removeEventListener('resize', updateWH)
            window.removeEventListener('scroll', updateS)
        }
    }, [])

    return (<></>)
}

export default DeviceUpdater