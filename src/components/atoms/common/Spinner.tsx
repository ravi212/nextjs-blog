import React from 'react';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Spinner: React.FC = () => (
  <Flex align="center" gap="middle">
        <Spin indicator={<LoadingOutlined className='text-white' spin />} size="default" />
  </Flex>
);

export default Spinner;