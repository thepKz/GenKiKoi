import { Empty, Table, TableProps } from "antd";

interface Props {
  columns: TableProps["columns"];
  dataSource: any;
  scroll?: string;
  loading?: boolean;
  className?: string;
  onChange?: (pagination: any) => void;
}

const CustomTable = (props: Props) => {
  const {
    columns,
    loading,
    dataSource,
    scroll = "calc(100vh - 260px)",
    className,
    onChange,
  } = props;
  return (
    <Table
      className={className}
      loading={loading}
      pagination={{
        showSizeChanger: true,
      }}
      locale={{
        emptyText: <Empty description="No Data" />,
      }}
      columns={columns}
      dataSource={dataSource}
      scroll={{
        y: scroll,
      }}
      onChange={onChange}
    />
  );
};

export default CustomTable;
