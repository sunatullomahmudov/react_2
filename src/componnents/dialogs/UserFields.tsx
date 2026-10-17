import { TextField } from "@mui/material"

const UserFields = ({ formik }: any) => {
  return (
    <>
      {[
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "phone", label: "Phone" },
        { name: "image", label: "Image URL" },
      ].map(({ name, label }) => (
        <TextField
          key={name}
          name={name}
          label={label}
          fullWidth
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched[name] && formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
        />
      ))}
    </>
  )
}

export default UserFields
