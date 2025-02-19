import { Select } from "antd";
import { Controller } from "react-hook-form";

function SelectCustom({
  control,
  data,
  keyField,
  valueField,
  name,
  placeholder,
  onChange,
  className
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            placeholder={placeholder}
            style={{ width: "100%" }}
            className={className}
            value={field?.value}
          >
            {data.map((item) => (
              <Select.Option value={item[keyField]} key={item[keyField]}>
                {item[valueField]}
              </Select.Option>
            ))}
          </Select>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </>
      )}
    />
  );
}

export default SelectCustom;
