import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space, Popconfirm } from "antd";
import { setConfig } from "@actions/configAction";
import { setLayerData } from "@actions/layerAction";

export default function Headers() {
  const dispatch = useDispatch();
  const { baseConfigData, currentLayerData } = useSelector((data) => data);

  const restConfing = useCallback(() => {
    let idx = "";
    let layer;
    baseConfigData.forEach((v, i) => {
      if (v.id === currentLayerData.id) {
        layer = v;
      }
    });
    dispatch(setLayerData(layer));
    dispatch(setConfig(baseConfigData));
  }, [currentLayerData.id]);

  return (
    <>
      <Space>
        <Button size="small">插入图片</Button>
        <Button size="small">导入PS</Button>
        <Popconfirm title="是否初始化，该过程不可逆" onConfirm={restConfing}>
          <Button size="small">初始化</Button>
        </Popconfirm>
      </Space>
    </>
  );
}
