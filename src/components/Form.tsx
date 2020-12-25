import React, { forwardRef } from "react";
import { Form, Input, InputNumber, DatePicker, Select } from "antd";

const FormItem = Form.Item;
const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const Forms = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  function generatorForm(formConfig) {
    return formConfig?.map(
      ({
        label,
        name,
        message,
        type,
        format,
        ENUM,
        mode,
        children,
        showTime,
      }) => (
        <FormItem
          key={name}
          label={label}
          name={name}
          rules={[{ required: Boolean(message), message }]}
        >
          {renderChildren({ type, format, ENUM, mode, children, showTime })}
        </FormItem>
      )
    );
  }

  function renderChildren({
    type = "input",
    format,
    ENUM,
    mode,
    children,
    showTime = true,
  }) {
    if (children) return children;
    if (type === "textarea") return <Input.TextArea rows="3" />;
    if (type === "datepicker")
      return (
        <DatePicker
          format={format || "YYYY-MM-DD HH:mm:ss"}
          showTime={showTime}
          showToday
        />
      );
    if (type === "inputnumber") return <InputNumber />;
    if (type === "input") return <Input />;
    if (type === "select") {
      return (
        <Select mode={mode}>
          {ENUM?.map((v) => (
            <Option key={v.key}>{v.name}</Option>
          ))}
        </Select>
      );
    }
  }

  return (
    <Form form={form} ref={ref} {...layout} initialValues={props.initialValues}>
      {generatorForm(props.formConfig)}
    </Form>
  );
});

export default Forms;
