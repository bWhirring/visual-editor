import React, { createRef, useState, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { debounce, throttle } from "lodash";
import { Input, Row, Col, InputNumber, Space, Form, Button, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useImmer } from "use-immer";
import { setConfig } from "@actions/configAction";
import { setLayerData } from "@actions/layerAction";
import { produce } from "immer";

const FormItem = Form.Item;

function Params(props) {
  let dispatch = useDispatch();
  const [form] = Form.useForm();

  let [id, setId] = useImmer("");

  const { currentLayerData, configData } = useSelector((data) => data);

  let { width, height, left, top, zIndex, text } = currentLayerData;

  useEffect(() => {
    setId((draft) => currentLayerData.id);
    let { value } = text || {};
    form.setFieldsValue({ width, height, left, top, zIndex, value });

    return () => {
      form.resetFields();
    };
  }, [currentLayerData.id, left, top]);

  const debounced = useDebouncedCallback(
    // function
    (val, type) => setLayerStyle(val, type),
    // delay in ms
    1000
  );

  const setLayerStyle = useCallback(
    (val, type) => {
      let idx = "";
      configData.forEach((v, i) => {
        if (v.id === id) idx = i;
      });
      let newCurrentLayerData = produce(currentLayerData, (draft) => {
        if (type === "value") {
          draft["text"].value = val;
        } else {
          draft[type] = val;
        }
      });
      let newConfigData = produce(configData, (draft) => {
        draft[idx] = newCurrentLayerData;
      });

      dispatch(setLayerData(newCurrentLayerData));
      dispatch(setConfig(newConfigData));
    },
    [id, left, top]
  );

  const renderFromItem = useCallback(
    (list: string[]) => {
      return list.map((v) => (
        <FormItem name={v} key={v}>
          <Input
            onChange={(e) => debounced.callback(e.target.value, v)}
            addonBefore={
              <span style={{ display: "inline-block", width: 60 }}>{v}</span>
            }
          />
        </FormItem>
      ));
    },
    [left, top]
  );

  let renderItemList: string[] = ["width", "height", "left", "top", "zIndex"];
  if (text?.value) renderItemList.push("value");
  return (
    <>
      {id ? (
        <>
          <Form form={form}>
            <Space direction="vertical">{renderFromItem(renderItemList)}</Space>
          </Form>
        </>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default Params;
