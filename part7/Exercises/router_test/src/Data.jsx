import { useLoaderData, useNavigation } from "react-router-dom";

export const Data = () => {
  const dogUrl = useLoaderData();
  const navigation = useNavigation();
  console.log(navigation);
  if (navigation.state === "loading") {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <img src={dogUrl} alt="" />
    </div>
  );
};

export const dataLoader = async () => {
  const res = await fetch("https://random.dog/woof.json");
  const dog = await res.json();
  return dog.url;
};
