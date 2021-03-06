import './BasicLayout.less'

import { Layout } from 'ant-design-vue'
import { ContainerQuery } from 'vue-container-query'
import { SiderMenuWrapper, GlobalFooter } from './components'
import { getComponentFromProp, isFun } from './utils/util'
import { SiderMenuProps } from './components/SiderMenu/SiderMenu'
import HeaderView, { HeaderViewProps } from './Header'
import WrapContent from './WrapContent'
import ConfigProvider from '@ant-design-vue/pro-layout/components/ConfigProvider'

export const BasicLayoutProps = {
  ...SiderMenuProps,
  ...HeaderViewProps,
  locale: {
    type: String,
    default: 'en-US'
  },
  breadcrumbRender: {
    type: Function,
    default: () => undefined
  },
  disableMobile: {
    type: Boolean,
    default: false
  },
  mediaQuery: {
    type: Object,
    default: () => {}
  },
  handleMediaQuery: {
    type: Function,
    default: () => undefined
  },
  footerRender: {
    type: Function,
    default: () => undefined
  }
}

const MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

const headerRender = (h, props) => {
  if (props.headerRender === false) {
    return null
  }
  return <HeaderView { ...{ props } } />
}

const BasicLayout = {
  name: 'BasicLayout',
  functional: true,
  props: BasicLayoutProps,
  render (h, content) {
    const { props, children } = content
    const {
      menus,
      layout,
      logo,
      // contentWidth,
      // theme,
      collapsed,
      // eslint-disable-next-line
      // autoHideHeader,
      mediaQuery,
      handleMediaQuery,
      handleCollapse,
      i18nRender
    } = props

    const footerRender = getComponentFromProp(content, 'footerRender')
    const rightContentRender = getComponentFromProp(content, 'rightContentRender')
    const collapsedButtonRender = getComponentFromProp(content, 'collapsedButtonRender')
    const menuHeaderRender = getComponentFromProp(content, 'menuHeaderRender')

    const cdProps = {
      ...props,
      footerRender,
      menuHeaderRender,
      rightContentRender,
      collapsedButtonRender
    }

    return (
      <ConfigProvider i18nRender={i18nRender}>
        <ContainerQuery query={MediaQueryEnum} onChange={handleMediaQuery}>
          <Layout class={{ 'basicLayout': true, ...mediaQuery }}>
            <SiderMenuWrapper
              { ...{ props: cdProps } }
              menus={menus}
              mode={'inline'}
              logo={logo}
              collapsed={collapsed}
              onCollapse={handleCollapse}
              handleCollapse={handleCollapse}
            />
            <Layout class={[layout]} style={{ paddingLeft: '0', minHeight: '100vh' }}>
              {headerRender(h, {
                ...cdProps,
                mode: 'horizontal',
              })}
              <WrapContent class="ant-pro-basicLayout-content">
                {children}
              </WrapContent>
              <Layout.Footer>
                { footerRender && (
                  isFun(footerRender) && footerRender(h) || footerRender
                ) || (
                  <GlobalFooter>
                    <template slot="links">
                      <a href="https://www.github.com/vueComponent/" target="_self">Github</a>
                      <a href="https://www.github.com/sendya/" target="_self">@Sendya</a>
                    </template>
                    <template slot="copyright">
                      <a href="https://github.com/vueComponent">vueComponent</a>
                    </template>
                  </GlobalFooter>
                )}
              </Layout.Footer>
            </Layout>
          </Layout>
        </ContainerQuery>
      </ConfigProvider>
    )
  }
}

export default BasicLayout
