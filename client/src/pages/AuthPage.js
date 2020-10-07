import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {Form,Button} from "react-bootstrap";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }


  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.userId,data.role)
    } catch (e) {}
  }

  return (

      <Form style={{margin:'10px'}}>
          <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                  className="form-control"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
              />

          </Form.Group>

          <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  className="form-control"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
              />

          </Form.Group>
          <Button
              variant="primary"
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={loginHandler}>
              login
          </Button>
      </Form>


  )
}
