import { Table, TableProps } from "antd";

interface Props {
  columns: TableProps["columns"];
  dataSource: any;
  scroll?: string;
  loading?: boolean;
}

const CustomTable = (props: Props) => {
  const {
    columns,
    loading,
    dataSource,
    scroll = "calc(100vh - 330px)",
  } = props;
  return (
    <Table
      loading={loading}
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