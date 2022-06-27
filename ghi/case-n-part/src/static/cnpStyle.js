import styled from "styled-components";

export const Navbar = styled.nav`
  background: darkslategrey;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Button = styled.button`
  display: inline-block;
  color: green;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;

  .current {
    a {
      border-bottom: 2px solid green;
    }
  }
`;

export const GpuImage = styled.img.attrs({
  src: "https://c1.neweggimages.com/ProductImage/11-129-268-36.jpg",
})`
  width: 50%;
`;

// const TomatoButton = styled(Button)`
//   color: tomato;
//   border-color: tomato;
// `;

// render(
//   <div>
//     <Button as="u">Normal Button</Button>
//     <Button as="a" href="#">
//       Link with Button styles
//     </Button>
//     <TomatoButton as="a" href="#">
//       Link with Tomato Button styles
//     </TomatoButton>
//   </div>
// );
