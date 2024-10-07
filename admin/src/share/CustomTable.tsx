import { Table, TableProps } from "antd";

interface Props {
  columns: TableProps["columns"];
  dataSource: any;
  scroll?: string;
}

const CustomTable = (props: Props) => {
  const { columns, dataSource, scroll = "calc(100vh - 330px)" } = props;
  return (
    <Table
      pagination={{
        showSizeChanger: true,
      }}
      columns={columns}
      dataSource={dataSource}
      scroll={{
        y: scroll,
      }}
    />
  );
};

export default CustomTable;
