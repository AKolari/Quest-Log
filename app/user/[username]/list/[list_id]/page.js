import List from "@/components/List";

const Page = ({ params: { list_id } }) => {
  return <List list_id={list_id}></List>;
};

export default Page;
