import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { useDispatch } from 'react-redux'

import FormValidator from '../../validators/FormValidator'
import { required, email } from '../../validators/customValidations'

import { actions } from '../../actions/Login'
import styles from './styles.module.scss'

// Define form fields
const EMAIL_FIELD = 'email'
const PASSWORD_FIELD = 'password'

// validations
const validator = new FormValidator([
  ...email(EMAIL_FIELD),
  ...required(PASSWORD_FIELD)
])

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function Login () {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [email, setEmail] = useState({ value: '' })
  const [password, setPassword] = useState({ value: '' })

  const formFields = { email, password }
  const validation = validator.validate(formFields)

  /**
   * update state with fields information
   *
   * @param event {object} input event
   */
  const handleEmailChange = (event) => setEmail({ value: event.target.value, dirty: true })

  /**
   * update state with fields information
   *
   * @param event {object} input event
   */
  const handlePasswordChange = (event) => setPassword({ value: event.target.value, dirty: true })

  const login = () => {
    if (validation.isValid) dispatch(actions.LoginAttempt({ email: email.value, password: password.value }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={EMAIL_FIELD}
                label="Email Address"
                name={EMAIL_FIELD}
                autoComplete={EMAIL_FIELD}
                error={!validation[EMAIL_FIELD].isValid && email.dirty}
                helperText={validation[EMAIL_FIELD].message}
                autoFocus
                onChange={handleEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                name={PASSWORD_FIELD}
                id={PASSWORD_FIELD}
                type="password"
                error={!validation[PASSWORD_FIELD].isValid && password.dirty}
                helperText={validation[PASSWORD_FIELD].message}
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={login}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </div>
  )
}
