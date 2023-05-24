import React, { forwardRef } from 'react';
import * as Form from '@radix-ui/react-form';

interface Props extends React.ComponentPropsWithRef<'input'> {
  label: string;
  message: string;
  warning: string;
}

// eslint-disable-next-line prefer-arrow-callback
const FormField = forwardRef(function FormField(
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { label, message, warning, ...rest } = props;
  return (
    <Form.Field className="form__field" name="email">
      <div className="form__field-header">
        <Form.Label className="form__label">{label}</Form.Label>
        <Form.Message className="form__message" match="valueMissing">
          {message}
        </Form.Message>
        <Form.Message className="form__message" match="typeMismatch">
          {warning}
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="form__input" ref={ref} required {...rest} />
      </Form.Control>
    </Form.Field>
  );
});

export default FormField;
