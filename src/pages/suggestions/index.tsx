import { NavBar } from "@/components/Navbar/NavBar";
import { MainContent } from "@/layouts/MainContent";
import styles from "./Suggestions.module.scss";

export default function Suggestions() {
  return (
    <>
      <NavBar />
      <MainContent>
        <p>Suggestions</p>
      </MainContent>
    </>
  );
}
