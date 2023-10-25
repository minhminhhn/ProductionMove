import React from "react"
import axios from '../../axios'
import { useState, useEffect } from "react"

const TestApi = () => {
    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoiREwxIiwic3RhdHVzIjoyLCJyb2xlIjozLCJpZCI6MzV9LCJpYXQiOjE2NzIyODEwODQsImV4cCI6MTY3MjI4NDY4NH0.Hc6QwCEa8KlXT3-uf3SYIWoPOwsxb4Ldcuu8arfLazY')
    const test = async () => {
        try {
            const data = await axios.post(
                '/api/sold-product', // path of API
                {
                    productId: 1,
                    customer: {
                        id: 1
                    }
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            ).then((data) => {
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            TestApi
            <button onClick={() => test()}>Test</button>
        </div>
    )
}

export default TestApi