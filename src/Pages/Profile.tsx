import NavBar from "../Components/NavBar";

export default function Profile({ signedIn }: { signedIn: boolean }) {
  return <NavBar signedIn={signedIn} />;
}
