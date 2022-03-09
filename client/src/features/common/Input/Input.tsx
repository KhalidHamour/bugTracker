import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface Iprops {
  name: String;
  label: String;
  half?: boolean;
  autoFocus?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
}

const InputField = (props: Iprops) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = props.name === "password";
  return (
    <Grid item xs={props.half ? 4 : 8}>
      <TextField
        variant="filled"
        required
        fullWidth
        value={props.value}
        autoFocus={props.autoFocus}
        label={props.name}
        type={isPassword ? (showPassword === false ? "password" : "text") : "text"}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        InputProps={
          props.name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};

export default InputField;
