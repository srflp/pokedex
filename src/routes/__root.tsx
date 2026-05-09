import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Container } from "../components/BaseComponents";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createRootRoute({
  component: () => (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  ),
});
