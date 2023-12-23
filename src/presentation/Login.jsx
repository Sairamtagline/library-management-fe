import { memo } from 'react'

import vectorLine from '../assets/images/png/vactor-lines.png'
import loginContainer from '../container/login.container'
import { title } from '../description/login.description'
import AuthWrapper from '../hoc/AuthWrapper'
import MBox from '../shared/MBox'
import MButton from '../shared/MButton'
import MInput from '../shared/MInput'
import MLoader from '../shared/MLoader'
import MStack from '../shared/MStack'
import MTypography from '../shared/MTypography'
import { ternary, values } from '../utils/javascript'
import { MUIStyled } from '../utils/muiStyled'

const MainWrapper = MUIStyled(MStack)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(180deg,${theme.palette.primary.main}, ${theme.palette.primary.gray})`,
  position: 'relative',
  overflow: 'hidden',
  padding: 16,
}))
const Heading = MUIStyled(MTypography)(({ theme }) => ({
  fontSize: 24,
  lineHeight: '28px',
  fontWeight: '700',
  color: theme.palette.white.main,
  textAlign: 'center',
}))
const FormWrapper = MUIStyled(MBox)(({ theme }) => ({
  padding: '32px 20px',
  background: theme.palette.secondary.darkBlue,
  borderRadius: 12,
  maxWidth: 350,
  width: '100%',
  margin: '0 auto',
  textAlign: 'center',
  backdropFilter: 'blur(2px)',
  '& .MuiFormGroup-root ': {
    width: '100%',
  },
}))
const Label = MUIStyled(MTypography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.white.main,
  textAlign: 'start',
  fontWeight: 700,
}))
const Vactor = MUIStyled('img')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: -200,
  height: '100%',
  opacity: 0.2,
}))

const Login = () => {
  const { login, handleChange, handleSubmit } = loginContainer()
  return (
    <>
      <MainWrapper>
        <Vactor src={vectorLine} alt="vactor" />
        <FormWrapper>
          <Heading variant="h2" mb={2.5}>
            {title}
          </Heading>
          <form onSubmit={handleSubmit}>
            <MStack spacing={1} alignItems="center">
              <Label width="100%">Email</Label>
              <MInput
                variant="filled"
                placeholder="Enter your email address"
                sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
                type="email"
                name="email"
                value={login.form.email}
                onChange={handleChange}
                error={ternary(login.errors?.email, true, false)}
                helperText={login.errors?.email}
              />
              <Label width="100%">Password</Label>
              <MInput
                variant="filled"
                placeholder="Enter your password"
                sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
                type="password"
                name="password"
                value={login.form.password}
                onChange={handleChange}
                error={ternary(login.errors?.password, true, false)}
                helperText={login.errors?.password}
              />
            </MStack>

            <MButton
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: '30px' }}
              disabled={
                values(login.errors).some(value => value) || login.isLoading
              }
            >
              {ternary(
                login.isLoading,
                <>
                  {title}
                  <MLoader sx={{ ml: 1 }} size={20} color="white" />
                </>,
                title,
              )}
            </MButton>
          </form>
        </FormWrapper>
      </MainWrapper>
    </>
  )
}

export default AuthWrapper(memo(Login))
