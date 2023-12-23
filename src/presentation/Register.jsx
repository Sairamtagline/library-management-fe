import registerContainer from '../container/register.container'
import MButton from '../shared/MButton'
import MInput from '../shared/MInput'
import MStack from '../shared/MStack'

const Register = () => {
  const { formData, handleChange, handleSubmit } = registerContainer()

  const list = [
    { name: 'username', label: 'Username' },
    { name: 'email', label: 'Email' },
    { name: 'password', label: 'Password' },
    { name: 'confirmPassword', label: 'Confirm Password' },
  ]

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <MStack spacing={1} alignItems="center">
          {list.map(({ label, name }) => (
            <MInput
              key={label}
              label={label}
              variant="filled"
              placeholder={`Enter your ${label.toLowerCase()}`}
              sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
              type={
                label.toLowerCase().includes('password') ? 'password' : 'text'
              }
              name={name}
              // name={label.toLowerCase().replace(' ', '')}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          ))}
          <MButton type="submit">Sign Up</MButton>
        </MStack>

        {/* <MStack spacing={1} alignItems="center">
          <MInput
            label="Username"
            variant="filled"
            placeholder="Enter your username"
            sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <MInput
            label="Email"
            variant="filled"
            placeholder="Enter your email address"
            sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <MInput
            label="Password"
            variant="filled"
            placeholder="Enter your password"
            sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <MInput
            label="Password"
            variant="filled"
            placeholder="Enter your confirm password"
            sx={{ '& .MuiInputBase-input': { fontSize: 15 } }}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <MButton type="submit">Sign Up</MButton>
        </MStack> */}
      </form>
    </div>
  )
}

export default Register
