import EditList from "@/components/EditList";
import List from "@/components/List";

const Page = ({ params: { list_id } }) => {
  return <EditList list_id={list_id}></EditList>;
};

export default Page;
