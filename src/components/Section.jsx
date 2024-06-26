import styled from "styled-components";

const StyledSection = styled.section`
  margin: 0 10%;
  padding: 2em 0;
  border-top: 1px solid #ddd;
  max-width: 80em;
`

const SectionHeader = styled.h2`
  margin: 0 0 1em 0;
  text-align: left;
  font-weight: 700;
`

function Section({ title, headerId, children }) {
  return (
    <StyledSection key={headerId || title} id={headerId || title}>
      <SectionHeader>
        {title}
      </SectionHeader>
      {children}
    </StyledSection>
  );
}

export default Section;