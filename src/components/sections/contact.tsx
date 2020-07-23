import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './contact.scss'

const Contact = ({ data }) => {
  const { frontmatter, html } = data[0].node
  const {
    message_placeholder,
    submit_button_text,
    title,
    snackbar_message,
    error_message,
  } = frontmatter
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  )
  const formRef = useRef(null)
  const snackbarRef = useRef(null)
  const snackbarRefError = useRef(null)
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [messageError, setMessageError] = useState(null)

  useEffect(() => {
    formRef.current.addEventListener('submit', event => {
      event.preventDefault()
      const formData = new FormData(formRef.current) as any
      fetch(formRef.current.getAttribute('action'), {
        method: 'POST',
        headers: {
          Accept: 'application/x-www-form-urlencoded;charset=UTF-8',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams(formData).toString(),
      }).then(res => {
        if (res.status === 200) {
          showSnackbar()
          formRef.current.reset()
          setNameError(null)
          setEmailError(null)
          setMessageError(null)
        } else {
          showSnackbarError()
        }
      })
    })
  }, [])

  const showSnackbar = () => {
    snackbarRef.current.className = 'show'

    // After 5 seconds, remove the show class from DIV
    setTimeout(function () {
      snackbarRef.current.className = snackbarRef.current.className.replace(
        'show',
        ''
      )
    }, 5000)
  }

  const showSnackbarError = () => {
    snackbarRefError.current.className = 'show'

    // After 5 seconds, remove the show class from DIV
    setTimeout(function () {
      snackbarRefError.current.className = snackbarRefError.current.className.replace(
        'show',
        ''
      )
    }, 5000)
  }

  const formHandler = event => {
    const { name, value } = event.target
    let tempErrors = errors
    switch (name) {
      case 'name':
        tempErrors.name =
          value.length < 5 ? 'Must be at least 5 characters' : ''
        setNameError(tempErrors.name.length > 0 ? true : false)
        break
      case 'email':
        tempErrors.email = validEmailRegex.test(value)
          ? ''
          : 'Email is not valid'
        setEmailError(tempErrors.email.length > 0 ? true : false)
        break
      case 'message':
        tempErrors.message = value.length < 1 ? 'Message must have content' : ''
        setMessageError(tempErrors.message.length > 0 ? true : false)
        break
      default:
        break
    }
    setErrors(tempErrors)
  }

  return (
    <section className="contact-flex-container" id="contact">
      <div className="contact-container">
        <h3 className="contact-container-title">{title}</h3>
        <div className="contact-content-container">
          <div
            className="contact-text-content"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
          <form
            name="contact"
            method="POST"
            netlify-honeypot="bot-field"
            data-netlify="true"
            ref={formRef}
            id="contactForm"
            style={{ width: '100%' }}
          >
            <input type="hidden" name="bot-field" />
            <div>
              <label>
                Your Name:
                <span className="contact-form-error">{errors.name}</span>
                <input
                  style={{
                    border: nameError
                      ? '1px solid var(--error)'
                      : '1px solid #ccc',
                  }}
                  type="text"
                  name="name"
                  onChange={formHandler}
                />
              </label>
            </div>
            <div>
              <label>
                Your Email:
                <span className="contact-form-error">{errors.email}</span>
                <input
                  style={{
                    border: emailError
                      ? '1px solid var(--error)'
                      : '1px solid #ccc',
                  }}
                  type="email"
                  name="email"
                  onChange={formHandler}
                />
              </label>
            </div>
            <div>
              <label>
                Message:
                <span className="contact-form-error">{errors.message}</span>
                <textarea
                  style={{
                    border: messageError
                      ? '1px solid var(--error)'
                      : '1px solid #ccc',
                  }}
                  name="message"
                  placeholder={message_placeholder}
                  onChange={formHandler}
                ></textarea>
              </label>
            </div>
            <div>
              <button
                className="contact-submit-button"
                type="submit"
                disabled={
                  nameError ||
                  emailError ||
                  messageError ||
                  nameError === null ||
                  emailError === null ||
                  messageError === null
                }
              >
                {submit_button_text}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="snackbar" ref={snackbarRef}>
        {snackbar_message}
      </div>
      <div id="snackbar-error" ref={snackbarRefError}>
        {error_message}
      </div>
    </section>
  )
}

Contact.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Contact
