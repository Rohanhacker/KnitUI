import React, { ReactNode } from "react"
import styled from "styled-components"
import {
  IStyled,
  fontSizeType
} from "../../../common/types"

/**
 * This type definintion has common elments from the parent (ModalWrapper)
 * Ideally we need to find a way to resue the same type definition in both
 * the places instead of having them duplicated.
 */
interface HeaderProps {
  title: string;
  fontSize?: fontSizeType,
  rightSection?: ReactNode,
  noFill?: boolean,
}

type IStyledHeaderProps = IStyled<HeaderProps>

const getFontSize = (props: IStyledHeaderProps) => {
  const { customProps: { fontSize }, theme: { knitui } } = props
  const typographySize = fontSize || knitui.modalTitleTypographySize
  return `${knitui.typography[typographySize].fontSize}rem`
}

const getLineHeight = (props: IStyledHeaderProps) => {
  const { customProps: { fontSize }, theme: { knitui } } = props
  const typographySize = fontSize || knitui.modalTitleTypographySize
  return `${knitui.typography[typographySize].lineHeight}rem`
}

const Container = styled.div<IStyledHeaderProps>`
  display: flex;
  padding: ${({ theme: { knitui } }) =>
    `1.4rem ${knitui.modalPadding.horizontal}`};
  border-radius: ${({ theme: { knitui } }) =>
    `${knitui.modalBorderRadius} ${knitui.modalBorderRadius} 0rem 0rem`};
  background: ${({ theme: { knitui }, customProps: { noFill } }) => noFill ? "none" : knitui.shades.gray95};
  border-bottom: ${({ customProps: { noFill }, theme: { knitui }}) => noFill ? knitui.modalBorder : "none"};
`
const TitleSection = styled.div<IStyledHeaderProps>`
  font-size: ${props => getFontSize(props) };
  line-height: ${props => getLineHeight(props)};
  color: ${({ theme: { knitui } }) => knitui.shades.gray20};
  margin-right: 1.4rem;
`

const RightSection = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`

const Header: React.FC<HeaderProps> = props => { 
  const { title, rightSection } = props
  const scProps = { customProps: props }
  return (
    <Container {...scProps}>
      <TitleSection {...scProps}>{title}</TitleSection>
      <RightSection>{rightSection}</RightSection>
    </Container>
  )
}

export default Header