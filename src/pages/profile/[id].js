import { useRouter } from "next/router";

export default function Profile({ params }) {
  const router = useRouter();
  const path = router.query.id;
  return (
    <div>
      <p>Show the details of the child with id {`${path}`}</p>
    </div>
  );
}
