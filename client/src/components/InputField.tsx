import React, { InputHTMLAttributes } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea
} from '@chakra-ui/core';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextArea = Input
  if (textarea) {
    InputOrTextArea = Textarea
  }

  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
