import BasicLayout, { BasicLayoutProps } from './BasicLayout'
import BlockLayout from './BlockLayout'
import PageHeaderWrapper from './components/PageHeaderWrapper'
import GlobalFooter from './components/GlobalFooter'
import DocumentTitle from './components/DocumentTitle'
import { updateTheme } from './utils/dynamicTheme'

export {
  GlobalFooter,
  PageHeaderWrapper,
  BlockLayout,
  DocumentTitle,
  BasicLayoutProps,

  updateTheme
}

export default BasicLayout
