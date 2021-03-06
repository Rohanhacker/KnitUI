import React, { useContext } from "react"
import styled, { css, ThemeContext } from "styled-components"
import _ from "lodash"
import Icon from "../Icon"
import { ILabel, LabelPropTypes } from "./types"
import InlineLabel from "./InlineLabel"
import { IStyled } from "../../common/types"
import { getFontColor, getBackgroundColor } from "./commonUtils"

const DEFAULT_COLOR_THEME = "neutral"
const INSET_BACKGROUND_COLOR = "#F7F7F7"

type IStyledLabel = IStyled<LabelPropTypes>

const typographySize = {
  small: 12,
  medium: 14,
  large: 14,
}

const getFontSize = (props: IStyledLabel) => {
  const {
    theme: {
      knitui: { typography },
    },
    customProps: { size },
  } = props
  return typography[typographySize[size!]].fontSize
}

const geLineHeight = (props: IStyledLabel) => {
  const {
    theme: {
      knitui: { typography },
    },
    customProps: { size },
  } = props
  return typography[typographySize[size!]].lineHeight
}

const getDarkenedBorderColor = (props: IStyledLabel) =>
  getBackgroundColor(props).set("hsl.l", "-0.2")

const showLeftIcon = (props: IStyledLabel) => {
  const {
    customProps: { icons },
  } = props
  return icons && icons.left
}

const showRightIcon = (props: IStyledLabel) => {
  const {
    customProps: { icons },
  } = props
  return icons && icons.right
}

const verticalPadding = {
  small: "0.1rem",
  medium: "0.2rem",
  large: "0.4rem",
}

const getVerticalPadding = (props: IStyledLabel) => {
  const {
    customProps: { size },
  } = props
  return verticalPadding[size!]
}

const getHorizontalPadding = (props: IStyledLabel) => {
  const {
    customProps: { expanded },
  } = props
  if (expanded) {
    return "1rem"
  }
  return "0.7rem"
}

const getLeftPadding = (props: IStyledLabel) => {
  const {
    customProps: { size },
  } = props
  if (showLeftIcon(props)) {
    return size === "small" ? "0.3rem" : "0.5rem"
  }
  return getHorizontalPadding(props)
}

const getRightPadding = (props: IStyledLabel) => {
  const {
    customProps: { size },
  } = props
  if (showRightIcon(props)) {
    return size === "small" ? "0.3rem" : "0.5rem"
  }
  return getHorizontalPadding(props)
}

const getTextMargin = (props: IStyledLabel) => {
  const {
    customProps: { size },
  } = props
  return size === "small" ? "0.2rem" : "0.4rem"
}

const getTextLeftMargin = (props: IStyledLabel) => {
  return showLeftIcon(props) ? getTextMargin(props) : "0rem"
}

const getTextRightMargin = (props: IStyledLabel) => {
  return showRightIcon(props) ? getTextMargin(props) : "0rem"
}

const getBorderColor = (props: IStyledLabel) => {
  const {
    customProps: { outlined },
  } = props
  return outlined ? getDarkenedBorderColor(props) : "transparent"
}

const getBorderRadius = (props: IStyledLabel) => {
  const {
    customProps: { rounded },
  } = props
  return rounded ? "999px" : "0.2rem"
}

const getBoxShadow = (props: IStyledLabel) => {
  const {
    theme: {
      knitui: { shades },
    },
    customProps: { focus },
  } = props
  return focus ? `0rem 0rem 0.2rem ${shades.blue50}` : "none"
}

const getInsetStyles = (props: IStyledLabel) => {
  const { insetColor } = props
  return insetColor
    ? css`
        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0.3rem;
          background: ${insetColor};
          border-radius: 0.2rem 0 0 0.2rem;
        }
      `
    : ""
}

const StyledDiv = styled.div<IStyledLabel>`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: ${props =>
    `${getVerticalPadding(props)} ${getRightPadding(
      props
    )} ${getVerticalPadding(props)} ${getLeftPadding(props)}`};
  background-color: ${props => getBackgroundColor(props)};
  color: ${props => getFontColor(props)};
  font-size: ${props => `${getFontSize(props)}rem`};
  line-height: ${props => `${geLineHeight(props)}rem`};
  border-radius: ${props => getBorderRadius(props)};
  border: ${props => `1px solid ${getBorderColor(props)}`};
  box-sizing: border-box;
  box-shadow: ${props => getBoxShadow(props)};
  overflow: hidden;
  ${props => getInsetStyles(props)}
`

const StyledTextSpan = styled.span<IStyledLabel>`
  margin: 0rem ${props => getTextRightMargin(props)} 0rem
    ${props => getTextLeftMargin(props)};
`

const Label: ILabel = props => {
  const { className, style, ...rest } = props
  const { text, icons, insetColor } = rest
  /**
   * Styled Component theme should be needed here, because getFontColor take theme
   * as argument
   */
  const theme = useContext(ThemeContext)
  /**
   * If an insetColor is specified, the background color should be set to a default unless
   * explicitly provided through customColor
   */
  if (insetColor) {
    rest.customColor = rest.customColor || INSET_BACKGROUND_COLOR
  }

  const scProps = { theme, customProps: rest }

  const renderLeftIcon = () => {
    if (!showLeftIcon(scProps)) {
      return null
    }
    if (_.isString(icons!.left)) {
      return <Icon fill={getFontColor(scProps)} type={icons!.left} />
    }
    return icons!.left
  }

  const renderRightIcon = () => {
    if (!showRightIcon(scProps)) {
      return null
    }
    if (_.isString(icons!.right)) {
      return <Icon fill={getFontColor(scProps)} type={icons!.right} />
    }
    return icons!.right
  }

  //For styled components, we separate the props that are to be loaded on the DOM
  return (
    <StyledDiv
      className={className}
      style={style}
      {...scProps}
      insetColor={insetColor}>
      {renderLeftIcon()}
      <StyledTextSpan {...scProps}>{text}</StyledTextSpan>
      {renderRightIcon()}
    </StyledDiv>
  )
}

Label.defaultProps = {
  expanded: false,
  size: "medium",
  rounded: false,
  outlined: false,
  colorPreset: DEFAULT_COLOR_THEME,
  focus: false,
}

Label.Inline = InlineLabel

export default Label
