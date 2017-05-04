// @flow
import { List } from 'immutable'
import React from 'react'
import EditorialContainer from '../../containers/EditorialContainer'
import { css, media } from '../../styles/jss'
import * as s from '../../styles/jso'

// -------------------------------------
// Row

const rowStyle = css(
  media(s.minBreak2, s.mb20, s.flex, s.flexWrap),
  media(s.minBreak4, s.mb40),
)

type RowProps = {
  children?: React.Element<*>,
}

const Row = (props: RowProps) => (
  <div className={rowStyle}>
    {props.children}
  </div>
)
Row.defaultProps = {
  children: null,
}

// -------------------------------------
// Cells

const cellStyle = css(
  s.flex,
  s.flexWrap,
  s.fullWidth,
  { height: '100vw' },
  s.overflowHidden,
  s.pb10,
  media(s.minBreak2, s.fullHeight, s.pb0),
)

type CellProps = {
  className: string,
  children?: React.Element<*>,
}

const Cell = (props: CellProps) =>
  <div className={`${cellStyle} ${props.className}`}>
    {props.children}
  </div>

Cell.defaultProps = {
  children: null,
}

// -------------------------------------
// Grid (Cell modifiers)

const height1 = media(s.minBreak2, { height: 420 })
const height2 = media(s.minBreak4, { height: 840 })
const halfHeight = css(
  media(s.minBreak2, { height: 'calc(50% - 10px)' }),
  media(s.minBreak4, { height: 'calc(50% - 20px)' }),
)

const width1 = media(s.minBreak2, { width: '33.333333%' })
const width2 = media(s.minBreak2, { flex: 1 })
const halfWidth = media(s.minBreak2, s.flex2)

const pushRight = css(
  media(s.minBreak2, s.pr20),
  media(s.minBreak4, s.pr40),
)

const alignEnd = media(s.minBreak2, s.selfEnd)

// -------------------------------------

const sectionStyle = css(
  s.flex,
  s.flexWrap,
  s.mxAuto,
  { maxWidth: 1360 },
)

export default({ ids }: { ids: List<string> }) => (
  <section className={sectionStyle}>
    { /* Row 1 */ }
    <Row>
      { ids.get(0) &&
        <Cell className={`${width2} ${height1} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(0)} />
        </Cell>
      }
      { ids.get(1) &&
        <Cell className={`${width1} ${height1}`}>
          <EditorialContainer editorialId={ids.get(1)} />
        </Cell>
      }
    </Row>

    { /* Row 2 */ }
    <Row>
      { ids.get(2) &&
        <Cell className={`${width1} ${height1} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(2)} />
        </Cell>
      }
      { ids.get(3) &&
        <Cell className={`${width1} ${height1} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(3)} />
        </Cell>
      }
      { ids.get(4) &&
        <Cell className={`${width1} ${height1}`}>
          <EditorialContainer editorialId={ids.get(4)} />
        </Cell>
      }
    </Row>

    { /* Row 3 */ }
    <Row>
      { ids.get(5) &&
        <Cell className={`${width2} ${height2} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(5)} />
        </Cell>
      }
      { ids.get(6) &&
        <Cell className={`${width1} ${height2}`}>
          <Cell className={halfHeight}>
            <EditorialContainer editorialId={ids.get(6)} />
          </Cell>
          { ids.get(7) &&
            <Cell className={`${halfHeight} ${alignEnd}`}>
              <EditorialContainer editorialId={ids.get(7)} />
            </Cell>
          }
        </Cell>
      }
    </Row>

    { /* Row 4 */ }
    <Row>
      { ids.get(8) &&
        <Cell className={`${width1} ${height2} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(8)} />
        </Cell>
      }
      { ids.get(9) &&
        <Cell className={`${width2} ${height2}`}>
          <Cell className={halfHeight}>
            <EditorialContainer editorialId={ids.get(9)} />
          </Cell>
          { ids.get(10) &&
            <Cell className={`${halfWidth} ${halfHeight} ${pushRight} ${alignEnd}`}>
              <EditorialContainer editorialId={ids.get(10)} />
            </Cell>
          }
          { ids.get(11) &&
            <Cell className={`${halfWidth} ${halfHeight} ${alignEnd}`}>
              <EditorialContainer editorialId={ids.get(11)} />
            </Cell>
          }
        </Cell>
      }
    </Row>

    { /* Reverse */ }

    { /* Row 5 (1) */ }
    <Row>
      { ids.get(12) &&
        <Cell className={`${width1} ${height1} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(12)} />
        </Cell>
      }
      { ids.get(13) &&
        <Cell className={`${width2} ${height1}`}>
          <EditorialContainer editorialId={ids.get(13)} />
        </Cell>
      }
    </Row>

    { /* Row 6 (2) */ }
    <Row>
      { ids.get(14) &&
        <Cell className={`${width1} ${height1} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(14)} />
        </Cell>
      }
      { ids.get(15) &&
        <Cell className={`${width1} ${height1} ${pushRight}`}>
          <EditorialContainer editorialId={ids.get(15)} />
        </Cell>
      }
      { ids.get(16) &&
        <Cell className={`${width1} ${height1}`}>
          <EditorialContainer editorialId={ids.get(16)} />
        </Cell>
      }
    </Row>

    { /* Row 7 (3) */ }
    <Row>
      { ids.get(17) &&
        <Cell className={`${width1} ${height2} ${pushRight}`}>
          <Cell className={halfHeight}>
            <EditorialContainer editorialId={ids.get(17)} />
          </Cell>
          { ids.get(18) &&
            <Cell className={`${halfHeight} ${alignEnd}`}>
              <EditorialContainer editorialId={ids.get(18)} />
            </Cell>
          }
        </Cell>
      }
      { ids.get(19) &&
        <Cell className={`${width2} ${height2}`}>
          <EditorialContainer editorialId={ids.get(19)} />
        </Cell>
      }
    </Row>

    { /* Row 8 (4) */ }
    <Row>
      { ids.get(20) &&
        <Cell className={`${width2} ${height2} ${pushRight}`}>
          <Cell className={halfHeight}>
            <EditorialContainer editorialId={ids.get(20)} />
          </Cell>
          { ids.get(21) &&
            <Cell className={`${halfWidth} ${halfHeight} ${pushRight} ${alignEnd}`}>
              <EditorialContainer editorialId={ids.get(21)} />
            </Cell>
          }
          { ids.get(22) &&
            <Cell className={`${halfWidth} ${halfHeight} ${alignEnd}`}>
              <EditorialContainer editorialId={ids.get(22)} />
            </Cell>
          }
        </Cell>
      }
      { ids.get(23) &&
        <Cell className={`${width1} ${height2}`}>
          <EditorialContainer editorialId={ids.get(23)} />
        </Cell>
      }
    </Row>
  </section>
)

