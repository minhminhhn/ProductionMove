import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addResources } from '../../store/slices/resourceSlice'
import useCallApi from '../../untils/fetch';
import { apiUrls } from '../../untils/constant';

const ResourceLoader = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(async () => {
        if (isLoggedIn) {
            await useCallApi(
                apiUrls.GET_RESOURCES,
                {
                    holders: {
                        agency: true,
                        maintainCenter: true,
                        factory: true
                    },
                    modelAttributes: {
                        generation: true,
                        bodyType: true,
                        boostType: true,
                        series: true,
                        engineType: true
                    }
                }
            ).then((response) => {
                dispatch(addResources(response.data))
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [isLoggedIn])
    return (<></>)
}

export default ResourceLoader