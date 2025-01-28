import { Input } from "antd"
import { Controller } from "react-hook-form"

function InputCustom({control, name, label, type}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {type === "password" ? (
            <Input.Password {...field} placeholder={label} />
          ) : (
            <Input placeholder={label} {...field} />
          )}
          {fieldState.error && (
            <span style={{ color: "red", display: "block" }}>
              {fieldState.error.message}
            </span>
          )}
        </>
      )}
    ></Controller>
  )
}

export default InputCustom
