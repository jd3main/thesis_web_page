import styled from "styled-components";

const StyledSection = styled.section`
  padding: 5em;
  border-top: 1px solid #ddd;
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