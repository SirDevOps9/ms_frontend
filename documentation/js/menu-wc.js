'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">microtecadminfrontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AccountModule-248e5694244569f5c41025b8fd0d081133ed0add042defad25bd55771eb81d1cefe4827ee1788e2b3c8f0cd9d23f668b9ff64a3df315bafad30c10f247ee9539"' : 'data-bs-target="#xs-components-links-module-AccountModule-248e5694244569f5c41025b8fd0d081133ed0add042defad25bd55771eb81d1cefe4827ee1788e2b3c8f0cd9d23f668b9ff64a3df315bafad30c10f247ee9539"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountModule-248e5694244569f5c41025b8fd0d081133ed0add042defad25bd55771eb81d1cefe4827ee1788e2b3c8f0cd9d23f668b9ff64a3df315bafad30c10f247ee9539"' :
                                            'id="xs-components-links-module-AccountModule-248e5694244569f5c41025b8fd0d081133ed0add042defad25bd55771eb81d1cefe4827ee1788e2b3c8f0cd9d23f668b9ff64a3df315bafad30c10f247ee9539"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConnectedAccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConnectedAccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeactivateAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeactivateAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmailPreferencesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailPreferencesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInMethodComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AccountModule-b4c97df41f754044843517bd192c22c9b6404b05fa311699823a6bcb479184fb3a0cd28bd728b880fb4ad0efb13c79a10ce508fefc03ebb681270cb665e5b2ac-1"' : 'data-bs-target="#xs-components-links-module-AccountModule-b4c97df41f754044843517bd192c22c9b6404b05fa311699823a6bcb479184fb3a0cd28bd728b880fb4ad0efb13c79a10ce508fefc03ebb681270cb665e5b2ac-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountModule-b4c97df41f754044843517bd192c22c9b6404b05fa311699823a6bcb479184fb3a0cd28bd728b880fb4ad0efb13c79a10ce508fefc03ebb681270cb665e5b2ac-1"' :
                                            'id="xs-components-links-module-AccountModule-b4c97df41f754044843517bd192c22c9b6404b05fa311699823a6bcb479184fb3a0cd28bd728b880fb4ad0efb13c79a10ce508fefc03ebb681270cb665e5b2ac-1"' }>
                                            <li class="link">
                                                <a href="components/AddChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCostCenterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCostCenterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartOfAccountConfigurationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartOfAccountConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartOfAccountTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartOfAccountTreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatOfAccountListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatOfAccountListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CostCenterListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CostCenterListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CostCenterTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CostCenterTreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCostCenterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCostCenterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainChartOfAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainChartOfAccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainCostCenterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainCostCenterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewCostCenterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewCostCenterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountRoutingModule.html" data-type="entity-link" >AccountRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-d3d9c6a78bc1da09268b5fea0eb03d291709b75f360786015757dea5b9b27615afe59aa16bb3ff8bf157fe173e7ce38cd7bc4df59c71efcec1b150afe3a9b907"' : 'data-bs-target="#xs-components-links-module-AppModule-d3d9c6a78bc1da09268b5fea0eb03d291709b75f360786015757dea5b9b27615afe59aa16bb3ff8bf157fe173e7ce38cd7bc4df59c71efcec1b150afe3a9b907"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d3d9c6a78bc1da09268b5fea0eb03d291709b75f360786015757dea5b9b27615afe59aa16bb3ff8bf157fe173e7ce38cd7bc4df59c71efcec1b150afe3a9b907"' :
                                            'id="xs-components-links-module-AppModule-d3d9c6a78bc1da09268b5fea0eb03d291709b75f360786015757dea5b9b27615afe59aa16bb3ff8bf157fe173e7ce38cd7bc4df59c71efcec1b150afe3a9b907"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-f3e2fcfa2e108dba33a123f8f518a6a5b4d35d2e9eee9fc428430049e05a535b4e8d76f0e08d6816dc0a3e890767646f73f61c30ba24069e4daf61cddea4b2ac-1"' : 'data-bs-target="#xs-components-links-module-AppModule-f3e2fcfa2e108dba33a123f8f518a6a5b4d35d2e9eee9fc428430049e05a535b4e8d76f0e08d6816dc0a3e890767646f73f61c30ba24069e4daf61cddea4b2ac-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f3e2fcfa2e108dba33a123f8f518a6a5b4d35d2e9eee9fc428430049e05a535b4e8d76f0e08d6816dc0a3e890767646f73f61c30ba24069e4daf61cddea4b2ac-1"' :
                                            'id="xs-components-links-module-AppModule-f3e2fcfa2e108dba33a123f8f518a6a5b4d35d2e9eee9fc428430049e05a535b4e8d76f0e08d6816dc0a3e890767646f73f61c30ba24069e4daf61cddea4b2ac-1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-844cc9f2f0838637fb2b786fc2a3928c32b413422c04aa2bc95228f3707d1ed5e099d78251a8b6bc5271e62352b3787d173fc99f3afef428eda5cf2cf82c1dc6-2"' : 'data-bs-target="#xs-components-links-module-AppModule-844cc9f2f0838637fb2b786fc2a3928c32b413422c04aa2bc95228f3707d1ed5e099d78251a8b6bc5271e62352b3787d173fc99f3afef428eda5cf2cf82c1dc6-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-844cc9f2f0838637fb2b786fc2a3928c32b413422c04aa2bc95228f3707d1ed5e099d78251a8b6bc5271e62352b3787d173fc99f3afef428eda5cf2cf82c1dc6-2"' :
                                            'id="xs-components-links-module-AppModule-844cc9f2f0838637fb2b786fc2a3928c32b413422c04aa2bc95228f3707d1ed5e099d78251a8b6bc5271e62352b3787d173fc99f3afef428eda5cf2cf82c1dc6-2"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-bd5bb37f4c6cd1bb64f670165d5018b2998adc9b9e64cbb89e2c9c62559ba28366d3c22ae68f7080b3c9561b577f9241c1a12468eaad34ff4848a971352a061a-3"' : 'data-bs-target="#xs-components-links-module-AppModule-bd5bb37f4c6cd1bb64f670165d5018b2998adc9b9e64cbb89e2c9c62559ba28366d3c22ae68f7080b3c9561b577f9241c1a12468eaad34ff4848a971352a061a-3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-bd5bb37f4c6cd1bb64f670165d5018b2998adc9b9e64cbb89e2c9c62559ba28366d3c22ae68f7080b3c9561b577f9241c1a12468eaad34ff4848a971352a061a-3"' :
                                            'id="xs-components-links-module-AppModule-bd5bb37f4c6cd1bb64f670165d5018b2998adc9b9e64cbb89e2c9c62559ba28366d3c22ae68f7080b3c9561b577f9241c1a12468eaad34ff4848a971352a061a-3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-3.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-45ca48ed7caf3ef0735519a2bcf48f09378049fb0bfd8aadfe19764f1122a93604371a097c547393ae36ec1861a32d0a1d21f367e47050fe2eab87f8bafc3dae-4"' : 'data-bs-target="#xs-components-links-module-AppModule-45ca48ed7caf3ef0735519a2bcf48f09378049fb0bfd8aadfe19764f1122a93604371a097c547393ae36ec1861a32d0a1d21f367e47050fe2eab87f8bafc3dae-4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-45ca48ed7caf3ef0735519a2bcf48f09378049fb0bfd8aadfe19764f1122a93604371a097c547393ae36ec1861a32d0a1d21f367e47050fe2eab87f8bafc3dae-4"' :
                                            'id="xs-components-links-module-AppModule-45ca48ed7caf3ef0735519a2bcf48f09378049fb0bfd8aadfe19764f1122a93604371a097c547393ae36ec1861a32d0a1d21f367e47050fe2eab87f8bafc3dae-4"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-4.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-383aa5667f7645a220b44e92b26ac8a36a58e1a92d8b54d1c9c30cd5c6580cfdebadfce39a9bcc10f3f86e06f30f53eab1d3ddd8952ccec045b04f7323c9220b-5"' : 'data-bs-target="#xs-components-links-module-AppModule-383aa5667f7645a220b44e92b26ac8a36a58e1a92d8b54d1c9c30cd5c6580cfdebadfce39a9bcc10f3f86e06f30f53eab1d3ddd8952ccec045b04f7323c9220b-5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-383aa5667f7645a220b44e92b26ac8a36a58e1a92d8b54d1c9c30cd5c6580cfdebadfce39a9bcc10f3f86e06f30f53eab1d3ddd8952ccec045b04f7323c9220b-5"' :
                                            'id="xs-components-links-module-AppModule-383aa5667f7645a220b44e92b26ac8a36a58e1a92d8b54d1c9c30cd5c6580cfdebadfce39a9bcc10f3f86e06f30f53eab1d3ddd8952ccec045b04f7323c9220b-5"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-5.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-9b5d17f20e398f288089e6671fb4a0ea8111135943c3f564c60b4565c3ecb71b9ddfe6def3a2369d9a5e1acbd46eb1dcb2fc5df3793c286968c96458dcbfccf7-6"' : 'data-bs-target="#xs-components-links-module-AppModule-9b5d17f20e398f288089e6671fb4a0ea8111135943c3f564c60b4565c3ecb71b9ddfe6def3a2369d9a5e1acbd46eb1dcb2fc5df3793c286968c96458dcbfccf7-6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-9b5d17f20e398f288089e6671fb4a0ea8111135943c3f564c60b4565c3ecb71b9ddfe6def3a2369d9a5e1acbd46eb1dcb2fc5df3793c286968c96458dcbfccf7-6"' :
                                            'id="xs-components-links-module-AppModule-9b5d17f20e398f288089e6671fb4a0ea8111135943c3f564c60b4565c3ecb71b9ddfe6def3a2369d9a5e1acbd46eb1dcb2fc5df3793c286968c96458dcbfccf7-6"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-6.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-2545523441c54ef768bc9192dd71be8337fc8f963ef40a12852e20db12f79db50affe342bdd7aa2545e413a3b26c6bd209053b4a24aed5be24e0993c6386442c-7"' : 'data-bs-target="#xs-components-links-module-AppModule-2545523441c54ef768bc9192dd71be8337fc8f963ef40a12852e20db12f79db50affe342bdd7aa2545e413a3b26c6bd209053b4a24aed5be24e0993c6386442c-7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2545523441c54ef768bc9192dd71be8337fc8f963ef40a12852e20db12f79db50affe342bdd7aa2545e413a3b26c6bd209053b4a24aed5be24e0993c6386442c-7"' :
                                            'id="xs-components-links-module-AppModule-2545523441c54ef768bc9192dd71be8337fc8f963ef40a12852e20db12f79db50affe342bdd7aa2545e413a3b26c6bd209053b4a24aed5be24e0993c6386442c-7"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-6.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-afbc99377e5980891e51f221a172d1f69c22a631d2893f7d814413cbb7f9463a44b8035fd2208a4f0c1604fd4a77107e28eb3039a40469e98257c1e955bc1a86-8"' : 'data-bs-target="#xs-components-links-module-AppModule-afbc99377e5980891e51f221a172d1f69c22a631d2893f7d814413cbb7f9463a44b8035fd2208a4f0c1604fd4a77107e28eb3039a40469e98257c1e955bc1a86-8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-afbc99377e5980891e51f221a172d1f69c22a631d2893f7d814413cbb7f9463a44b8035fd2208a4f0c1604fd4a77107e28eb3039a40469e98257c1e955bc1a86-8"' :
                                            'id="xs-components-links-module-AppModule-afbc99377e5980891e51f221a172d1f69c22a631d2893f7d814413cbb7f9463a44b8035fd2208a4f0c1604fd4a77107e28eb3039a40469e98257c1e955bc1a86-8"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-7.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppsSharedLibModule.html" data-type="entity-link" >AppsSharedLibModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppsSharedLibModule-da7ce220e4031a77589dd23b786f013d4ed74e59962754a6e9bbd2cecaeb3355bd774d92f1e8915dd26c09d67a06d522916d6776165c752eaa33e9adc37d3cf9"' : 'data-bs-target="#xs-components-links-module-AppsSharedLibModule-da7ce220e4031a77589dd23b786f013d4ed74e59962754a6e9bbd2cecaeb3355bd774d92f1e8915dd26c09d67a06d522916d6776165c752eaa33e9adc37d3cf9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppsSharedLibModule-da7ce220e4031a77589dd23b786f013d4ed74e59962754a6e9bbd2cecaeb3355bd774d92f1e8915dd26c09d67a06d522916d6776165c752eaa33e9adc37d3cf9"' :
                                            'id="xs-components-links-module-AppsSharedLibModule-da7ce220e4031a77589dd23b786f013d4ed74e59962754a6e9bbd2cecaeb3355bd774d92f1e8915dd26c09d67a06d522916d6776165c752eaa33e9adc37d3cf9"' }>
                                            <li class="link">
                                                <a href="components/ActtachmentViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActtachmentViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppStoreModule.html" data-type="entity-link" >AppStoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' : 'data-bs-target="#xs-components-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' :
                                            'id="xs-components-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' }>
                                            <li class="link">
                                                <a href="components/AppDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartItemDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartItemDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListAppsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListAppsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentSuccesfulComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentSuccesfulComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' : 'data-bs-target="#xs-injectables-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' :
                                        'id="xs-injectables-links-module-AppStoreModule-50d3e03fa2f359e890c6132f79842594b40252531b9a9f366772570b3f4a623dbefec1c890c1f3e090a79933510615bad12d4d140410e4096211560be083c289"' }>
                                        <li class="link">
                                            <a href="injectables/RouterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BuilderModule.html" data-type="entity-link" >BuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BuilderModule-e62ecda6da2bcfe58f99f3a072818fd368ec2167a35c8b6d4d7591b213b27a44cb4e467590512136b87a1451a605f166925a174417896b9207e7afee6bc4e98a"' : 'data-bs-target="#xs-components-links-module-BuilderModule-e62ecda6da2bcfe58f99f3a072818fd368ec2167a35c8b6d4d7591b213b27a44cb4e467590512136b87a1451a605f166925a174417896b9207e7afee6bc4e98a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BuilderModule-e62ecda6da2bcfe58f99f3a072818fd368ec2167a35c8b6d4d7591b213b27a44cb4e467590512136b87a1451a605f166925a174417896b9207e7afee6bc4e98a"' :
                                            'id="xs-components-links-module-BuilderModule-e62ecda6da2bcfe58f99f3a072818fd368ec2167a35c8b6d4d7591b213b27a44cb4e467590512136b87a1451a605f166925a174417896b9207e7afee6bc4e98a"' }>
                                            <li class="link">
                                                <a href="components/BuilderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuilderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BusinessOwnerModule.html" data-type="entity-link" >BusinessOwnerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BusinessOwnerRoutingModule.html" data-type="entity-link" >BusinessOwnerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CardsModule.html" data-type="entity-link" >CardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardsModule-14a22ac8b1a04085d3641f94a4186172d8debf8d6aa740545dd6bbb477dd4246103b563a2dae511f7697725042adc5e19dce18091c6fdc71d1cd6c5ffbbf0422"' : 'data-bs-target="#xs-components-links-module-CardsModule-14a22ac8b1a04085d3641f94a4186172d8debf8d6aa740545dd6bbb477dd4246103b563a2dae511f7697725042adc5e19dce18091c6fdc71d1cd6c5ffbbf0422"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardsModule-14a22ac8b1a04085d3641f94a4186172d8debf8d6aa740545dd6bbb477dd4246103b563a2dae511f7697725042adc5e19dce18091c6fdc71d1cd6c5ffbbf0422"' :
                                            'id="xs-components-links-module-CardsModule-14a22ac8b1a04085d3641f94a4186172d8debf8d6aa740545dd6bbb477dd4246103b563a2dae511f7697725042adc5e19dce18091c6fdc71d1cd6c5ffbbf0422"' }>
                                            <li class="link">
                                                <a href="components/Card1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Card1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Card2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Card2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Card3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Card3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Card4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Card4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Card5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Card5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatInnerModule.html" data-type="entity-link" >ChatInnerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChatInnerModule-fa11aecfe795c94221785e9059271840caa891eb59a168697e5d48b9d39f4b8f7c16b5a8cb025dad5cd62380138b4bd0c83ed12e187d0a04d31bdb9dcc30857f"' : 'data-bs-target="#xs-components-links-module-ChatInnerModule-fa11aecfe795c94221785e9059271840caa891eb59a168697e5d48b9d39f4b8f7c16b5a8cb025dad5cd62380138b4bd0c83ed12e187d0a04d31bdb9dcc30857f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatInnerModule-fa11aecfe795c94221785e9059271840caa891eb59a168697e5d48b9d39f4b8f7c16b5a8cb025dad5cd62380138b4bd0c83ed12e187d0a04d31bdb9dcc30857f"' :
                                            'id="xs-components-links-module-ChatInnerModule-fa11aecfe795c94221785e9059271840caa891eb59a168697e5d48b9d39f4b8f7c16b5a8cb025dad5cd62380138b4bd0c83ed12e187d0a04d31bdb9dcc30857f"' }>
                                            <li class="link">
                                                <a href="components/ChatInnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatInnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChatModule-eb1dd35f574284f3669d0873fee534b76cfa80ac3cfebdfb9f0ce8900cd3cced5a219b9dfc9886ef48453357a26864679dc3ff19dd178c6aa62c31e8bebf8878"' : 'data-bs-target="#xs-components-links-module-ChatModule-eb1dd35f574284f3669d0873fee534b76cfa80ac3cfebdfb9f0ce8900cd3cced5a219b9dfc9886ef48453357a26864679dc3ff19dd178c6aa62c31e8bebf8878"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatModule-eb1dd35f574284f3669d0873fee534b76cfa80ac3cfebdfb9f0ce8900cd3cced5a219b9dfc9886ef48453357a26864679dc3ff19dd178c6aa62c31e8bebf8878"' :
                                            'id="xs-components-links-module-ChatModule-eb1dd35f574284f3669d0873fee534b76cfa80ac3cfebdfb9f0ce8900cd3cced5a219b9dfc9886ef48453357a26864679dc3ff19dd178c6aa62c31e8bebf8878"' }>
                                            <li class="link">
                                                <a href="components/ChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrawerChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DrawerChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivateChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivateChatComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatRoutingModule.html" data-type="entity-link" >ChatRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CmsModule.html" data-type="entity-link" >CmsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CmsModule-ddc0cf68043c242c99bf67a5da27ebcca83f1c0ba9d08e280963f8a1d423127c21778cd81bd82e19c63f5abe135f6845f76b9189e9740ecdea7a770ffd190fe0"' : 'data-bs-target="#xs-components-links-module-CmsModule-ddc0cf68043c242c99bf67a5da27ebcca83f1c0ba9d08e280963f8a1d423127c21778cd81bd82e19c63f5abe135f6845f76b9189e9740ecdea7a770ffd190fe0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CmsModule-ddc0cf68043c242c99bf67a5da27ebcca83f1c0ba9d08e280963f8a1d423127c21778cd81bd82e19c63f5abe135f6845f76b9189e9740ecdea7a770ffd190fe0"' :
                                            'id="xs-components-links-module-CmsModule-ddc0cf68043c242c99bf67a5da27ebcca83f1c0ba9d08e280963f8a1d423127c21778cd81bd82e19c63f5abe135f6845f76b9189e9740ecdea7a770ffd190fe0"' }>
                                            <li class="link">
                                                <a href="components/AddCMSComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCMSComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCMSComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCMSComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListCMSComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListCMSComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CMSRoutingModule.html" data-type="entity-link" >CMSRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CompanyModule.html" data-type="entity-link" >CompanyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' : 'data-bs-target="#xs-components-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' :
                                            'id="xs-components-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' }>
                                            <li class="link">
                                                <a href="components/CompaniesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyAddresComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyAddresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyBranchesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyBranchesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyContactComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyHierarchyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyHierarchyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyLegalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyLegalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBranchesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditBranchesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCompanyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewBranchesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewBranchesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewCompanyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCompanyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' : 'data-bs-target="#xs-injectables-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' :
                                        'id="xs-injectables-links-module-CompanyModule-5c98dee250724c263a5a79da05fc6bcaa7c320092f63501bb8312b3338e2fe8fa1359c993638734a5f5b6094d47a1705ad124d335615fdca0d0a4fc7aa8a6a6c"' }>
                                        <li class="link">
                                            <a href="injectables/RouterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' : 'data-bs-target="#xs-components-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' :
                                            'id="xs-components-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' }>
                                            <li class="link">
                                                <a href="components/AccountingDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountingDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' : 'data-bs-target="#xs-pipes-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' :
                                            'id="xs-pipes-links-module-DashboardModule-6380d4a80165adfe7e044c1b48f78c54a69373f79048638f0b206de78140102fcd14a09e5e4c6bbf90f5f03846b7b9388ba64b615afaee5c4fd953da4adbdf17"' }>
                                            <li class="link">
                                                <a href="pipes/DecimalSeperatorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DecimalSeperatorPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-e4208a8b7be7bf83084fb11b617f3c206033a39096c6837587b38e1a8ec9fba278d30230518c119c7f5309cae0d37ad69aadf7437f6f419d1e69d05e991d0f12-1"' : 'data-bs-target="#xs-components-links-module-DashboardModule-e4208a8b7be7bf83084fb11b617f3c206033a39096c6837587b38e1a8ec9fba278d30230518c119c7f5309cae0d37ad69aadf7437f6f419d1e69d05e991d0f12-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-e4208a8b7be7bf83084fb11b617f3c206033a39096c6837587b38e1a8ec9fba278d30230518c119c7f5309cae0d37ad69aadf7437f6f419d1e69d05e991d0f12-1"' :
                                            'id="xs-components-links-module-DashboardModule-e4208a8b7be7bf83084fb11b617f3c206033a39096c6837587b38e1a8ec9fba278d30230518c119c7f5309cae0d37ad69aadf7437f6f419d1e69d05e991d0f12-1"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DrawersModule.html" data-type="entity-link" >DrawersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DrawersModule-06715ef71ad2def15d87a7a16d8964aee8f0a6ab75badd7bec9c503ba5a7d50a7c4111b7b9734596547ab45a1f69f21226726f418dc2c297830ad35038b0a4ef"' : 'data-bs-target="#xs-components-links-module-DrawersModule-06715ef71ad2def15d87a7a16d8964aee8f0a6ab75badd7bec9c503ba5a7d50a7c4111b7b9734596547ab45a1f69f21226726f418dc2c297830ad35038b0a4ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DrawersModule-06715ef71ad2def15d87a7a16d8964aee8f0a6ab75badd7bec9c503ba5a7d50a7c4111b7b9734596547ab45a1f69f21226726f418dc2c297830ad35038b0a4ef"' :
                                            'id="xs-components-links-module-DrawersModule-06715ef71ad2def15d87a7a16d8964aee8f0a6ab75badd7bec9c503ba5a7d50a7c4111b7b9734596547ab45a1f69f21226726f418dc2c297830ad35038b0a4ef"' }>
                                            <li class="link">
                                                <a href="components/ActivityDrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityDrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessengerDrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessengerDrawerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DropdownMenusModule.html" data-type="entity-link" >DropdownMenusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DropdownMenusModule-0597daa70397ef952b4ba3e9a962783e122223b45b94cb255560a50e5e5a3320f8eceb70b04e152f8190723d4adeccb03e371cf3394c2d6260d8420340df53fe"' : 'data-bs-target="#xs-components-links-module-DropdownMenusModule-0597daa70397ef952b4ba3e9a962783e122223b45b94cb255560a50e5e5a3320f8eceb70b04e152f8190723d4adeccb03e371cf3394c2d6260d8420340df53fe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DropdownMenusModule-0597daa70397ef952b4ba3e9a962783e122223b45b94cb255560a50e5e5a3320f8eceb70b04e152f8190723d4adeccb03e371cf3394c2d6260d8420340df53fe"' :
                                            'id="xs-components-links-module-DropdownMenusModule-0597daa70397ef952b4ba3e9a962783e122223b45b94cb255560a50e5e5a3320f8eceb70b04e152f8190723d4adeccb03e371cf3394c2d6260d8420340df53fe"' }>
                                            <li class="link">
                                                <a href="components/DropdownMenu1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownMenu1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownMenu2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownMenu2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownMenu3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownMenu3Component</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' : 'data-bs-target="#xs-components-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' :
                                            'id="xs-components-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' }>
                                            <li class="link">
                                                <a href="components/CreateEmployeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateEmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEmployeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditEmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainEmployeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainEmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewEmployeeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewEmployeeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' :
                                        'id="xs-injectables-links-module-EmployeeModule-a783b56a84be90e2920f628cdc62f0cc2fffef2be37c87554627ed10e14a4223f07c932abe4a704add3206579d4c6c36ad8b2abe796a4ae7c6da353106bb4d6c"' }>
                                        <li class="link">
                                            <a href="injectables/RouterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EngagesModule.html" data-type="entity-link" >EngagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EngagesModule-35f81d098d22bff7b90a5d5fa35268337c0d65d792585e9c91d6ac2f04c5b0399a49381e4f62c28be4cb5f8e707952bf2bf2f011a5babf402befbc101d0d99c3"' : 'data-bs-target="#xs-components-links-module-EngagesModule-35f81d098d22bff7b90a5d5fa35268337c0d65d792585e9c91d6ac2f04c5b0399a49381e4f62c28be4cb5f8e707952bf2bf2f011a5babf402befbc101d0d99c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EngagesModule-35f81d098d22bff7b90a5d5fa35268337c0d65d792585e9c91d6ac2f04c5b0399a49381e4f62c28be4cb5f8e707952bf2bf2f011a5babf402befbc101d0d99c3"' :
                                            'id="xs-components-links-module-EngagesModule-35f81d098d22bff7b90a5d5fa35268337c0d65d792585e9c91d6ac2f04c5b0399a49381e4f62c28be4cb5f8e707952bf2bf2f011a5babf402befbc101d0d99c3"' }>
                                            <li class="link">
                                                <a href="components/ExploreMainDrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExploreMainDrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpDrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpDrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PurchaseToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ERPUserModule.html" data-type="entity-link" >ERPUserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' : 'data-bs-target="#xs-components-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' :
                                            'id="xs-components-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' }>
                                            <li class="link">
                                                <a href="components/ERPUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ERPUserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' : 'data-bs-target="#xs-injectables-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' :
                                        'id="xs-injectables-links-module-ERPUserModule-64e3444a21893565dfbee6b06bc449830ef1f1dfd7d58c4c0a178ba17f357035d84d66e356ce6b71280d17b2276705932d8b2469f5824bd320620dfbbf9f8bbd"' }>
                                        <li class="link">
                                            <a href="injectables/RouterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorsModule.html" data-type="entity-link" >ErrorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ErrorsModule-388aa4f713def3ec9720b1e53e0f94fbc3f9d573b0c47e881b1c85fd6de5bd0b44ddea615f004e72816922026723e1f569ef5f55bed126824c8296251d77db2c"' : 'data-bs-target="#xs-components-links-module-ErrorsModule-388aa4f713def3ec9720b1e53e0f94fbc3f9d573b0c47e881b1c85fd6de5bd0b44ddea615f004e72816922026723e1f569ef5f55bed126824c8296251d77db2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorsModule-388aa4f713def3ec9720b1e53e0f94fbc3f9d573b0c47e881b1c85fd6de5bd0b44ddea615f004e72816922026723e1f569ef5f55bed126824c8296251d77db2c"' :
                                            'id="xs-components-links-module-ErrorsModule-388aa4f713def3ec9720b1e53e0f94fbc3f9d573b0c47e881b1c85fd6de5bd0b44ddea615f004e72816922026723e1f569ef5f55bed126824c8296251d77db2c"' }>
                                            <li class="link">
                                                <a href="components/Error404Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Error404Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Error500Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Error500Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorsRoutingModule.html" data-type="entity-link" >ErrorsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExtrasModule.html" data-type="entity-link" >ExtrasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExtrasModule-2150e69c53c745726688d5f97dca5bb3a8e5c7ddbed2828738670e75e6e06bdfa53c5ecb52492fa1df554198436aa18ea63ba89a576dd7e0dc14f870d9c73c2c"' : 'data-bs-target="#xs-components-links-module-ExtrasModule-2150e69c53c745726688d5f97dca5bb3a8e5c7ddbed2828738670e75e6e06bdfa53c5ecb52492fa1df554198436aa18ea63ba89a576dd7e0dc14f870d9c73c2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExtrasModule-2150e69c53c745726688d5f97dca5bb3a8e5c7ddbed2828738670e75e6e06bdfa53c5ecb52492fa1df554198436aa18ea63ba89a576dd7e0dc14f870d9c73c2c"' :
                                            'id="xs-components-links-module-ExtrasModule-2150e69c53c745726688d5f97dca5bb3a8e5c7ddbed2828738670e75e6e06bdfa53c5ecb52492fa1df554198436aa18ea63ba89a576dd7e0dc14f870d9c73c2c"' }>
                                            <li class="link">
                                                <a href="components/LayoutScrollTopComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutScrollTopComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsInnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsInnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuickLinksInnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuickLinksInnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchResultInnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchResultInnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinanceModule.html" data-type="entity-link" >FinanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FinanceModule-b91e77e8dc22b2d774d4e28896f12983fd812c1a2db4d4e0cd37a40db765c2e95e5b8ba284cd9caac19d9a255e619959140c1faa3124cf03337a9f54387eb923"' : 'data-bs-target="#xs-components-links-module-FinanceModule-b91e77e8dc22b2d774d4e28896f12983fd812c1a2db4d4e0cd37a40db765c2e95e5b8ba284cd9caac19d9a255e619959140c1faa3124cf03337a9f54387eb923"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FinanceModule-b91e77e8dc22b2d774d4e28896f12983fd812c1a2db4d4e0cd37a40db765c2e95e5b8ba284cd9caac19d9a255e619959140c1faa3124cf03337a9f54387eb923"' :
                                            'id="xs-components-links-module-FinanceModule-b91e77e8dc22b2d774d4e28896f12983fd812c1a2db4d4e0cd37a40db765c2e95e5b8ba284cd9caac19d9a255e619959140c1faa3124cf03337a9f54387eb923"' }>
                                            <li class="link">
                                                <a href="components/AddBankDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddBankDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddPaymentMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPaymentMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddPaymentTermComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPaymentTermComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddTreasuryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddTreasuryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BankDefinitionListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankDefinitionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBankDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditBankDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPaymentMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPaymentMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPaymentTermComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPaymentTermComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditTreasuryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditTreasuryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainBankDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainBankDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainPaymentMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainPaymentMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainPaymentTermComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainPaymentTermComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentMethodListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentMethodListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentTermListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentTermListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreauryDefinitionListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreauryDefinitionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewBankDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewBankDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewPaymentMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPaymentMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewPaymentTermComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPaymentTermComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewTreasuryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewTreasuryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GeneralSettingModule.html" data-type="entity-link" >GeneralSettingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GeneralSettingModule-a2f27617079f47934edfb70b8b76a278ab765624fcee51dd9d1850cffe7b2cf8c1ca44fac577b7ac78f1a3073a73b3c650db013606b819e9ead1835b1e6bbde3"' : 'data-bs-target="#xs-components-links-module-GeneralSettingModule-a2f27617079f47934edfb70b8b76a278ab765624fcee51dd9d1850cffe7b2cf8c1ca44fac577b7ac78f1a3073a73b3c650db013606b819e9ead1835b1e6bbde3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GeneralSettingModule-a2f27617079f47934edfb70b8b76a278ab765624fcee51dd9d1850cffe7b2cf8c1ca44fac577b7ac78f1a3073a73b3c650db013606b819e9ead1835b1e6bbde3"' :
                                            'id="xs-components-links-module-GeneralSettingModule-a2f27617079f47934edfb70b8b76a278ab765624fcee51dd9d1850cffe7b2cf8c1ca44fac577b7ac78f1a3073a73b3c650db013606b819e9ead1835b1e6bbde3"' }>
                                            <li class="link">
                                                <a href="components/AddCurrencyConversionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCurrencyConversionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCurrencyDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCurrencyDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateFinancialCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateFinancialCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CurrencyConversionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyConversionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CurrencyDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCurrencyConversionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCurrencyConversionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCurrencyDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCurrencyDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditFinancialCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditFinancialCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FinancialCalendarListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinancialCalendarListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainFinancialCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainFinancialCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxDefinitionAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaxDefinitionAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaxDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxDefinitionEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaxDefinitionEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxGroupAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaxGroupAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaxGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaxGroupEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaxGroupEditComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpPageModule.html" data-type="entity-link" >HelpPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HelpPageModule-948b6f0588bfe4679f58241b757386e541a9dd4adf2533a730506764ddb28d8b5c44cb0e567d97a189722f728cfd16a867c845c1bd17e212dd9b77f8454be78d"' : 'data-bs-target="#xs-components-links-module-HelpPageModule-948b6f0588bfe4679f58241b757386e541a9dd4adf2533a730506764ddb28d8b5c44cb0e567d97a189722f728cfd16a867c845c1bd17e212dd9b77f8454be78d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpPageModule-948b6f0588bfe4679f58241b757386e541a9dd4adf2533a730506764ddb28d8b5c44cb0e567d97a189722f728cfd16a867c845c1bd17e212dd9b77f8454be78d"' :
                                            'id="xs-components-links-module-HelpPageModule-948b6f0588bfe4679f58241b757386e541a9dd4adf2533a730506764ddb28d8b5c44cb0e567d97a189722f728cfd16a867c845c1bd17e212dd9b77f8454be78d"' }>
                                            <li class="link">
                                                <a href="components/HelpPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeHelpPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeHelpPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainHelpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainHelpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpPagesModule.html" data-type="entity-link" >HelpPagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HelpPagesModule-c5e84dfcb18af9e147f4b7c2d633e35eeab067565f81626c23f32e8f58ce4dc24057c3aa35c19bb3fb8f32019caf9f2dde6e1ee0fffcbceb7f86cbb228e0a4f2"' : 'data-bs-target="#xs-components-links-module-HelpPagesModule-c5e84dfcb18af9e147f4b7c2d633e35eeab067565f81626c23f32e8f58ce4dc24057c3aa35c19bb3fb8f32019caf9f2dde6e1ee0fffcbceb7f86cbb228e0a4f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HelpPagesModule-c5e84dfcb18af9e147f4b7c2d633e35eeab067565f81626c23f32e8f58ce4dc24057c3aa35c19bb3fb8f32019caf9f2dde6e1ee0fffcbceb7f86cbb228e0a4f2"' :
                                            'id="xs-components-links-module-HelpPagesModule-c5e84dfcb18af9e147f4b7c2d633e35eeab067565f81626c23f32e8f58ce4dc24057c3aa35c19bb3fb8f32019caf9f2dde6e1ee0fffcbceb7f86cbb228e0a4f2"' }>
                                            <li class="link">
                                                <a href="components/AddHelpPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddHelpPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditHelpsPagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditHelpsPagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListHelpPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListHelpPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpPagesRoutingModule.html" data-type="entity-link" >HelpPagesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ItemsModule.html" data-type="entity-link" >ItemsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ItemsModule-4be356b9a5980d24ee500c005e350ed36a159cb4767d353336523e4658224320974f3aa875318afe8f056d2fa01f92001fd5eec922f78c3b42e5400e0afbbf9a"' : 'data-bs-target="#xs-components-links-module-ItemsModule-4be356b9a5980d24ee500c005e350ed36a159cb4767d353336523e4658224320974f3aa875318afe8f056d2fa01f92001fd5eec922f78c3b42e5400e0afbbf9a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ItemsModule-4be356b9a5980d24ee500c005e350ed36a159cb4767d353336523e4658224320974f3aa875318afe8f056d2fa01f92001fd5eec922f78c3b42e5400e0afbbf9a"' :
                                            'id="xs-components-links-module-ItemsModule-4be356b9a5980d24ee500c005e350ed36a159cb4767d353336523e4658224320974f3aa875318afe8f056d2fa01f92001fd5eec922f78c3b42e5400e0afbbf9a"' }>
                                            <li class="link">
                                                <a href="components/AddAttributeDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddAttributeDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddBarcodePopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddBarcodePopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddItemCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddItemCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddItemDefinitionPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddItemDefinitionPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddItemsCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddItemsCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddVariantPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddVariantPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddWarehouseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddWarehouseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddWarehousePopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddWarehousePopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttributeDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttributeDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttributeDefinitionListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttributeDefinitionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttributeDefinitionListValuesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttributeDefinitionListValuesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttributeDefinitionValuesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttributeDefinitionValuesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAttributeDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditAttributeDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCategoryUomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCategoryUomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditItemCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditItemCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditItemDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditItemDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditWarehouseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditWarehouseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeneralSettingInvComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneralSettingInvComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemCatalogTabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemCatalogTabsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemCategoryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemCategoryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefinitionAttributesVariantsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefinitionAttributesVariantsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefinitionBarcodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefinitionBarcodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefinitionGeneralComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefinitionGeneralComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefinitionInventoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefinitionInventoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefinitionListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefinitionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefinitionUomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefinitionUomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefintionTaxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefintionTaxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemDefintionVariantComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemDefintionVariantComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemFixedCostComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemFixedCostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemsCategoryTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsCategoryTreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainItemCategoriesTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainItemCategoriesTreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainWarehouseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainWarehouseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OperationTagAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OperationTagAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OperationTagEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OperationTagEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OperationTagListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OperationTagListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OperationTagMainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OperationTagMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UOMAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UOMAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UOMEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UOMEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UOMListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UOMListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UOMMainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UOMMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UomViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UomViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewItemCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewItemCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewItemDefinitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewItemDefinitionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewQRcodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewQRcodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewVariantPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewVariantPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewWarehouseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewWarehouseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WarehouseListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WarehouseListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WarehouseTabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WarehouseTabsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JournalEntryModule.html" data-type="entity-link" >JournalEntryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-JournalEntryModule-5482d5f7e5f1b3edd759d0ecc56651fc932666fb9bfcbbe1b754f549773ea3046d22989f516b90b5112e0f40d188c37fd39c1301d05a4db5a6535d412a466844"' : 'data-bs-target="#xs-components-links-module-JournalEntryModule-5482d5f7e5f1b3edd759d0ecc56651fc932666fb9bfcbbe1b754f549773ea3046d22989f516b90b5112e0f40d188c37fd39c1301d05a4db5a6535d412a466844"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-JournalEntryModule-5482d5f7e5f1b3edd759d0ecc56651fc932666fb9bfcbbe1b754f549773ea3046d22989f516b90b5112e0f40d188c37fd39c1301d05a4db5a6535d412a466844"' :
                                            'id="xs-components-links-module-JournalEntryModule-5482d5f7e5f1b3edd759d0ecc56651fc932666fb9bfcbbe1b754f549773ea3046d22989f516b90b5112e0f40d188c37fd39c1301d05a4db5a6535d412a466844"' }>
                                            <li class="link">
                                                <a href="components/AccountStatementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountStatementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddJournalEntryOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddJournalEntryOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttachmentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttachmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CostCenterAllocationPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CostCenterAllocationPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CostCenterReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CostCenterReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateJournalEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateJournalEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCostCenterAllocationPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCostCenterAllocationPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditJournalEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditJournalEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditJournalEntryOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditJournalEntryOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JournalEntryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JournalEntryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JournalEntryOpeningBalanceListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JournalEntryOpeningBalanceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JournalTemplatePopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JournalTemplatePopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainJournalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainJournalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiSelectDetailedAccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiSelectDetailedAccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoChildrenAccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoChildrenAccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrialBlanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrialBlanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewJournalEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewJournalEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewJournalEntryOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewJournalEntryOpeningBalanceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link" >LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LayoutModule-237c28947d6b5d1b86cf01fe8fc81bf5cc529d7d48a446c278822c97d0f9e28fe7c99bd0fa8f41bf814edaff423cbfb077a4a24a1f1ff44139588d55cd13bf64"' : 'data-bs-target="#xs-components-links-module-LayoutModule-237c28947d6b5d1b86cf01fe8fc81bf5cc529d7d48a446c278822c97d0f9e28fe7c99bd0fa8f41bf814edaff423cbfb077a4a24a1f1ff44139588d55cd13bf64"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-237c28947d6b5d1b86cf01fe8fc81bf5cc529d7d48a446c278822c97d0f9e28fe7c99bd0fa8f41bf814edaff423cbfb077a4a24a1f1ff44139588d55cd13bf64"' :
                                            'id="xs-components-links-module-LayoutModule-237c28947d6b5d1b86cf01fe8fc81bf5cc529d7d48a446c278822c97d0f9e28fe7c99bd0fa8f41bf814edaff423cbfb077a4a24a1f1ff44139588d55cd13bf64"' }>
                                            <li class="link">
                                                <a href="components/LayoutHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutSidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModuleListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModuleListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link" >LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LayoutModule-7188e6fce4fbfb4d2373c2b80dad6f65d8e1b2941254085db1e821143f5492b172c74ee1e77796e02a5a3abf00959ad2da2f0f9bba64b810ab7fd03bbc03c1a5-1"' : 'data-bs-target="#xs-components-links-module-LayoutModule-7188e6fce4fbfb4d2373c2b80dad6f65d8e1b2941254085db1e821143f5492b172c74ee1e77796e02a5a3abf00959ad2da2f0f9bba64b810ab7fd03bbc03c1a5-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-7188e6fce4fbfb4d2373c2b80dad6f65d8e1b2941254085db1e821143f5492b172c74ee1e77796e02a5a3abf00959ad2da2f0f9bba64b810ab7fd03bbc03c1a5-1"' :
                                            'id="xs-components-links-module-LayoutModule-7188e6fce4fbfb4d2373c2b80dad6f65d8e1b2941254085db1e821143f5492b172c74ee1e77796e02a5a3abf00959ad2da2f0f9bba64b810ab7fd03bbc03c1a5-1"' }>
                                            <li class="link">
                                                <a href="components/AccountingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AsideComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AsideComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AsideMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AsideMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClassicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EngagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EngagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExtendedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtendedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageTitleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageTitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScriptsInitComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScriptsInitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarLogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarLogoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link" >LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LayoutModule-282c9f32b48c8dcc7480555695055ab7892fda1df22ab0f0e59ae9b643251dc2eed16cf18e81eec6ac448c5258444147024d9a6d7a5d9c69a6256c6b1ceb5816-2"' : 'data-bs-target="#xs-components-links-module-LayoutModule-282c9f32b48c8dcc7480555695055ab7892fda1df22ab0f0e59ae9b643251dc2eed16cf18e81eec6ac448c5258444147024d9a6d7a5d9c69a6256c6b1ceb5816-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-282c9f32b48c8dcc7480555695055ab7892fda1df22ab0f0e59ae9b643251dc2eed16cf18e81eec6ac448c5258444147024d9a6d7a5d9c69a6256c6b1ceb5816-2"' :
                                            'id="xs-components-links-module-LayoutModule-282c9f32b48c8dcc7480555695055ab7892fda1df22ab0f0e59ae9b643251dc2eed16cf18e81eec6ac448c5258444147024d9a6d7a5d9c69a6256c6b1ceb5816-2"' }>
                                            <li class="link">
                                                <a href="components/LayoutComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MicrotecAuthLibModule.html" data-type="entity-link" >MicrotecAuthLibModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' : 'data-bs-target="#xs-components-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' :
                                            'id="xs-components-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginRedirectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginRedirectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutRedirectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutRedirectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UnAuthorizedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UnAuthorizedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' : 'data-bs-target="#xs-directives-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' :
                                        'id="xs-directives-links-module-MicrotecAuthLibModule-2481bc499914e256acd0e4061431f49a937a997b761607794a836d3d1153161f381c268f22d7ff504b659c815431c394b65f510c8b7da04aa31bff59f7eeb2b2"' }>
                                        <li class="link">
                                            <a href="directives/HasPermissionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HasPermissionDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalsModule.html" data-type="entity-link" >ModalsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ModalsModule-5d06514e2021f7e922934f89329ba2f8ee11d4fda204ec4b1d68f8ef94a7e381472b31c02da65e32e4e0c4bf8b0d77f44847148814f0f063bb5d583bd28b9a97"' : 'data-bs-target="#xs-components-links-module-ModalsModule-5d06514e2021f7e922934f89329ba2f8ee11d4fda204ec4b1d68f8ef94a7e381472b31c02da65e32e4e0c4bf8b0d77f44847148814f0f063bb5d583bd28b9a97"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalsModule-5d06514e2021f7e922934f89329ba2f8ee11d4fda204ec4b1d68f8ef94a7e381472b31c02da65e32e4e0c4bf8b0d77f44847148814f0f063bb5d583bd28b9a97"' :
                                            'id="xs-components-links-module-ModalsModule-5d06514e2021f7e922934f89329ba2f8ee11d4fda204ec4b1d68f8ef94a7e381472b31c02da65e32e4e0c4bf8b0d77f44847148814f0f063bb5d583bd28b9a97"' }>
                                            <li class="link">
                                                <a href="components/InviteUsersModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InviteUsersModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpgradePlanModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpgradePlanModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxTranslateModule.html" data-type="entity-link" >NgxTranslateModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrimeSharedModule.html" data-type="entity-link" >PrimeSharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfileModule-dedbe18b38de1d362ec64ec0d14d34ae394b34dbbe1e6ddd4f1706b14dc5be685074a494cb3875d1b23ab658e3dfb44cf259ddfd5e9bfdee307215a0826bf9d6"' : 'data-bs-target="#xs-components-links-module-ProfileModule-dedbe18b38de1d362ec64ec0d14d34ae394b34dbbe1e6ddd4f1706b14dc5be685074a494cb3875d1b23ab658e3dfb44cf259ddfd5e9bfdee307215a0826bf9d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-dedbe18b38de1d362ec64ec0d14d34ae394b34dbbe1e6ddd4f1706b14dc5be685074a494cb3875d1b23ab658e3dfb44cf259ddfd5e9bfdee307215a0826bf9d6"' :
                                            'id="xs-components-links-module-ProfileModule-dedbe18b38de1d362ec64ec0d14d34ae394b34dbbe1e6ddd4f1706b14dc5be685074a494cb3875d1b23ab658e3dfb44cf259ddfd5e9bfdee307215a0826bf9d6"' }>
                                            <li class="link">
                                                <a href="components/CampaignsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CampaignsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConnectionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConnectionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link" >ProfileRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PurchaseModule.html" data-type="entity-link" >PurchaseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PurchaseModule-833059f123c77a133506d6a59a22255fc746c3307a61703906cd2f4dd6bb6986c474fdfafd39a1ea821a42ac7738927b8e54b68d4e3d850e00eb84262fb93594"' : 'data-bs-target="#xs-components-links-module-PurchaseModule-833059f123c77a133506d6a59a22255fc746c3307a61703906cd2f4dd6bb6986c474fdfafd39a1ea821a42ac7738927b8e54b68d4e3d850e00eb84262fb93594"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PurchaseModule-833059f123c77a133506d6a59a22255fc746c3307a61703906cd2f4dd6bb6986c474fdfafd39a1ea821a42ac7738927b8e54b68d4e3d850e00eb84262fb93594"' :
                                            'id="xs-components-links-module-PurchaseModule-833059f123c77a133506d6a59a22255fc746c3307a61703906cd2f4dd6bb6986c474fdfafd39a1ea821a42ac7738927b8e54b68d4e3d850e00eb84262fb93594"' }>
                                            <li class="link">
                                                <a href="components/AddVendorDefinitionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddVendorDefinitionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateVendorCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateVendorCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditVendorCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditVendorCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditVendorDefinitionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditVendorDefinitionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainVendorCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainVendorCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainVendorDefintionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainVendorDefintionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorCategoryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorCategoryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorDefinitionsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorDefinitionsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceDistributeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceDistributeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceDistributeViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceDistributeViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceMainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VendorOpeningBalanceViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendorOpeningBalanceViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PurchaseTransactionsModule.html" data-type="entity-link" >PurchaseTransactionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PurchaseTransactionsModule-cf44f263eb8ec8da43e20b2a74f41f3d73f33f90e43fb9002f5e58215c3d697d456008185ac7784b8fe2baf4f2f26d5bb45e2633b497e6769774b9dca68d5e48"' : 'data-bs-target="#xs-components-links-module-PurchaseTransactionsModule-cf44f263eb8ec8da43e20b2a74f41f3d73f33f90e43fb9002f5e58215c3d697d456008185ac7784b8fe2baf4f2f26d5bb45e2633b497e6769774b9dca68d5e48"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PurchaseTransactionsModule-cf44f263eb8ec8da43e20b2a74f41f3d73f33f90e43fb9002f5e58215c3d697d456008185ac7784b8fe2baf4f2f26d5bb45e2633b497e6769774b9dca68d5e48"' :
                                            'id="xs-components-links-module-PurchaseTransactionsModule-cf44f263eb8ec8da43e20b2a74f41f3d73f33f90e43fb9002f5e58215c3d697d456008185ac7784b8fe2baf4f2f26d5bb45e2633b497e6769774b9dca68d5e48"' }>
                                            <li class="link">
                                                <a href="components/AddPurchaseInvoiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPurchaseInvoiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPurchaseInvoiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPurchaseInvoiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemAdvancedSearchEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemAdvancedSearchEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemAdvancedSearchPurchaseInvoiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemAdvancedSearchPurchaseInvoiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainPurchaseInvoiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainPurchaseInvoiceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PurchaseInvoiceListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseInvoiceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PurchaseInvoiceTrackingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PurchaseInvoiceTrackingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrackingEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackingEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewInvoiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewInvoiceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportsModule.html" data-type="entity-link" >ReportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReportsModule-1dd80e3553045e413125e539e4dc63727a34dbd28d6218f2a6d65f9f20a668ab4e3460bffeca6544ccefeab1d0c303454eb1ca6917d89e28ed891388654422f5"' : 'data-bs-target="#xs-components-links-module-ReportsModule-1dd80e3553045e413125e539e4dc63727a34dbd28d6218f2a6d65f9f20a668ab4e3460bffeca6544ccefeab1d0c303454eb1ca6917d89e28ed891388654422f5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportsModule-1dd80e3553045e413125e539e4dc63727a34dbd28d6218f2a6d65f9f20a668ab4e3460bffeca6544ccefeab1d0c303454eb1ca6917d89e28ed891388654422f5"' :
                                            'id="xs-components-links-module-ReportsModule-1dd80e3553045e413125e539e4dc63727a34dbd28d6218f2a6d65f9f20a668ab4e3460bffeca6544ccefeab1d0c303454eb1ca6917d89e28ed891388654422f5"' }>
                                            <li class="link">
                                                <a href="components/BankAccountStatementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankAccountStatementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreasuryStatementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreasuryStatementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportsModule.html" data-type="entity-link" >ReportsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' : 'data-bs-target="#xs-components-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' :
                                            'id="xs-components-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' }>
                                            <li class="link">
                                                <a href="components/ItemCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchItemAdvancedPopUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchItemAdvancedPopUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' : 'data-bs-target="#xs-directives-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' :
                                        'id="xs-directives-links-module-ReportsModule-2a275b33221f1b7af32250a831a79c62038902ff75c0b81e7fdfa5216e4eb9767da8a56c624fc3e5e9942a6791b80d7ac58fe9ae7bb7751ca5daad2bb0d3f569-1"' }>
                                        <li class="link">
                                            <a href="directives/LoaderDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SalesModule.html" data-type="entity-link" >SalesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SalesModule-55c38d733dd42ecd8747f3f82710d33dd0d39376d56de89c41a4c54ea26ec2eaa406f0a03fd0235299e00ad85647c4ee5678402fb2f5b618f9a535f292eb2f9b"' : 'data-bs-target="#xs-components-links-module-SalesModule-55c38d733dd42ecd8747f3f82710d33dd0d39376d56de89c41a4c54ea26ec2eaa406f0a03fd0235299e00ad85647c4ee5678402fb2f5b618f9a535f292eb2f9b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SalesModule-55c38d733dd42ecd8747f3f82710d33dd0d39376d56de89c41a4c54ea26ec2eaa406f0a03fd0235299e00ad85647c4ee5678402fb2f5b618f9a535f292eb2f9b"' :
                                            'id="xs-components-links-module-SalesModule-55c38d733dd42ecd8747f3f82710d33dd0d39376d56de89c41a4c54ea26ec2eaa406f0a03fd0235299e00ad85647c4ee5678402fb2f5b618f9a535f292eb2f9b"' }>
                                            <li class="link">
                                                <a href="components/AddCustomerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCustomerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCustomerOpeeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddCustomerOpeeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddPricePolicyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPricePolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateCustomerCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateCustomerCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerCategoryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerCategoryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerObViewDistributionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerObViewDistributionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerOpeningBalanceDistributeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerOpeningBalanceDistributeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerOpeningBalanceListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerOpeningBalanceListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerOpeningBalanceNoChildrenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerOpeningBalanceNoChildrenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCustomerCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCustomerCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCustomerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCustomerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCustomerOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCustomerOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPricePolicyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPricePolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainCustomerCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainCustomerCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainCustomerDefintionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainCustomerDefintionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainCustomerOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainCustomerOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiSelectItemsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiSelectItemsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopupExcelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopupExcelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PricePolicyListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PricePolicyListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PricePolicyMainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PricePolicyMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdetePricePolicyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdetePricePolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewCustomerOpeningBalanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewCustomerOpeningBalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewPricePolicyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPricePolicyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SequenceModule.html" data-type="entity-link" >SequenceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SequenceModule-4abda2be1ab9b0a08f72ed3712c518adc11360b1dfd9733fd3356389ab823977f922089c951096b16bbd4db9b44d013858d75ace8a2e6f2bffb1a018480b464e"' : 'data-bs-target="#xs-components-links-module-SequenceModule-4abda2be1ab9b0a08f72ed3712c518adc11360b1dfd9733fd3356389ab823977f922089c951096b16bbd4db9b44d013858d75ace8a2e6f2bffb1a018480b464e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SequenceModule-4abda2be1ab9b0a08f72ed3712c518adc11360b1dfd9733fd3356389ab823977f922089c951096b16bbd4db9b44d013858d75ace8a2e6f2bffb1a018480b464e"' :
                                            'id="xs-components-links-module-SequenceModule-4abda2be1ab9b0a08f72ed3712c518adc11360b1dfd9733fd3356389ab823977f922089c951096b16bbd4db9b44d013858d75ace8a2e6f2bffb1a018480b464e"' }>
                                            <li class="link">
                                                <a href="components/ConfirmSequenceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmSequenceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequenceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequenceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedLibModule.html" data-type="entity-link" >SharedLibModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' : 'data-bs-target="#xs-components-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' :
                                            'id="xs-components-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' }>
                                            <li class="link">
                                                <a href="components/AccordionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccordionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttachmentViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttachmentViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadCrumbComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadCrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonMicroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonMicroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangeColumnComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangeColumnComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ColumnsSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColumnsSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditMultipeFilesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditMultipeFilesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FieldValidationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FieldValidationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FildestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FildestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileUploaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileUploaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputSwitchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputSwitchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NamedFileUploaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NamedFileUploaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewBreadCrumbComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewBreadCrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopupPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopupPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RatingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RatingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchEngineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchEngineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectIconComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SharedFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharedFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablePaginatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablePaginatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablePrintComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablePrintComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToastComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToastComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToggelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToggelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadMultipeFilesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadMultipeFilesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' : 'data-bs-target="#xs-directives-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' :
                                        'id="xs-directives-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' }>
                                        <li class="link">
                                            <a href="directives/LoaderDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NumberFormatDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberFormatDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' : 'data-bs-target="#xs-pipes-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' :
                                            'id="xs-pipes-links-module-SharedLibModule-d106c3e82f985355f32d6b7c00a4e568c3980aad839185f065db71bc02e9b8962e392f003a6eae8b3eac2ab0c2434fe6ddf7cefb9f8c7e1ad91adf60f39827ee"' }>
                                            <li class="link">
                                                <a href="pipes/GetElementByIDPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetElementByIDPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/GetLookupPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetLookupPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NumberFormatPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberFormatPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SplashScreenModule.html" data-type="entity-link" >SplashScreenModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SplashScreenModule-e960e41849e8638dd4840e852479d3234332735235142c413d0ec31c21f34bd683c87c732e7ac378eda155d716f3f819c0459ef5d020df45bab2805317a6ada0"' : 'data-bs-target="#xs-components-links-module-SplashScreenModule-e960e41849e8638dd4840e852479d3234332735235142c413d0ec31c21f34bd683c87c732e7ac378eda155d716f3f819c0459ef5d020df45bab2805317a6ada0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SplashScreenModule-e960e41849e8638dd4840e852479d3234332735235142c413d0ec31c21f34bd683c87c732e7ac378eda155d716f3f819c0459ef5d020df45bab2805317a6ada0"' :
                                            'id="xs-components-links-module-SplashScreenModule-e960e41849e8638dd4840e852479d3234332735235142c413d0ec31c21f34bd683c87c732e7ac378eda155d716f3f819c0459ef5d020df45bab2805317a6ada0"' }>
                                            <li class="link">
                                                <a href="components/SplashScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SplashScreenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscriptionModule.html" data-type="entity-link" >SubscriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SubscriptionModule-544c61b225542da1d9d5ac948930a7ba81ce795189c0e5f0f87aa4d3a2b3a0992ae97a45f978273a5b3588e2fc267b091831fc428168577efc2a3f1cfb53b091"' : 'data-bs-target="#xs-components-links-module-SubscriptionModule-544c61b225542da1d9d5ac948930a7ba81ce795189c0e5f0f87aa4d3a2b3a0992ae97a45f978273a5b3588e2fc267b091831fc428168577efc2a3f1cfb53b091"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SubscriptionModule-544c61b225542da1d9d5ac948930a7ba81ce795189c0e5f0f87aa4d3a2b3a0992ae97a45f978273a5b3588e2fc267b091831fc428168577efc2a3f1cfb53b091"' :
                                            'id="xs-components-links-module-SubscriptionModule-544c61b225542da1d9d5ac948930a7ba81ce795189c0e5f0f87aa4d3a2b3a0992ae97a45f978273a5b3588e2fc267b091831fc428168577efc2a3f1cfb53b091"' }>
                                            <li class="link">
                                                <a href="components/AddDomainSpaceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddDomainSpaceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageAppsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageAppsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MySubscriptionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MySubscriptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscriptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThemeModeModule.html" data-type="entity-link" >ThemeModeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ThemeModeModule-e75458a5bb5e2e399869ab3bf82ef1b395f1e171740c3f724c956cab22735de0b492e959e91c9c1c818799237c547a369f489861f7719e7e9934a9e5fa40442b"' : 'data-bs-target="#xs-components-links-module-ThemeModeModule-e75458a5bb5e2e399869ab3bf82ef1b395f1e171740c3f724c956cab22735de0b492e959e91c9c1c818799237c547a369f489861f7719e7e9934a9e5fa40442b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThemeModeModule-e75458a5bb5e2e399869ab3bf82ef1b395f1e171740c3f724c956cab22735de0b492e959e91c9c1c818799237c547a369f489861f7719e7e9934a9e5fa40442b"' :
                                            'id="xs-components-links-module-ThemeModeModule-e75458a5bb5e2e399869ab3bf82ef1b395f1e171740c3f724c956cab22735de0b492e959e91c9c1c818799237c547a369f489861f7719e7e9934a9e5fa40442b"' }>
                                            <li class="link">
                                                <a href="components/ThemeModeSwitcherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemeModeSwitcherComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionsModule.html" data-type="entity-link" >TransactionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TransactionsModule-e56f8ddfd68aa3e1483db8c228dfe23a5679baef8004cb8b6db3abc5c3161bf3c5d4383aeb84e85ae7b0be099d0af6b85e89655b37a925e387754ce01849d056"' : 'data-bs-target="#xs-components-links-module-TransactionsModule-e56f8ddfd68aa3e1483db8c228dfe23a5679baef8004cb8b6db3abc5c3161bf3c5d4383aeb84e85ae7b0be099d0af6b85e89655b37a925e387754ce01849d056"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TransactionsModule-e56f8ddfd68aa3e1483db8c228dfe23a5679baef8004cb8b6db3abc5c3161bf3c5d4383aeb84e85ae7b0be099d0af6b85e89655b37a925e387754ce01849d056"' :
                                            'id="xs-components-links-module-TransactionsModule-e56f8ddfd68aa3e1483db8c228dfe23a5679baef8004cb8b6db3abc5c3161bf3c5d4383aeb84e85ae7b0be099d0af6b85e89655b37a925e387754ce01849d056"' }>
                                            <li class="link">
                                                <a href="components/AddStockInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddStockInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddStockOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddStockOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditStockInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditStockInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditStockOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditStockOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportStockInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportStockInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainStockInListComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainStockInListComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainStockOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainStockOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiSelectItemStockInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiSelectItemStockInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScanParcodeStockInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScanParcodeStockInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchItemPopUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchItemPopUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockInListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockInListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockOutListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockOutListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrackingStockInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackingStockInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewStockInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewStockInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewStockOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewStockOutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TranscationsModule.html" data-type="entity-link" >TranscationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TranscationsModule-7038c868886a3210de0c9b72c27c1e07bb9933248d19a6218f1ede9a0d1c569a608b2e14cdc98b8fa386a8419283fe842785c114bc6480448be1a8c8a4b4ab3b"' : 'data-bs-target="#xs-components-links-module-TranscationsModule-7038c868886a3210de0c9b72c27c1e07bb9933248d19a6218f1ede9a0d1c569a608b2e14cdc98b8fa386a8419283fe842785c114bc6480448be1a8c8a4b4ab3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TranscationsModule-7038c868886a3210de0c9b72c27c1e07bb9933248d19a6218f1ede9a0d1c569a608b2e14cdc98b8fa386a8419283fe842785c114bc6480448be1a8c8a4b4ab3b"' :
                                            'id="xs-components-links-module-TranscationsModule-7038c868886a3210de0c9b72c27c1e07bb9933248d19a6218f1ede9a0d1c569a608b2e14cdc98b8fa386a8419283fe842785c114bc6480448be1a8c8a4b4ab3b"' }>
                                            <li class="link">
                                                <a href="components/AddPaymentInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPaymentInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddPaymentOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPaymentOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddPaymentOutCostCenterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPaymentOutCostCenterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPaymentInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPaymentInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPaymentOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPaymentOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainPaymentInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainPaymentInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainPaymentOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainPaymentOutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentInListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentInListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentOutListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentOutListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentOutPaymentMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentOutPaymentMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopupAccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopupAccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReadExcelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReadExcelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewPaymentInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPaymentInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewPaymentOutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPaymentOutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TranslationModule.html" data-type="entity-link" >TranslationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' : 'data-bs-target="#xs-components-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' :
                                            'id="xs-components-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' }>
                                            <li class="link">
                                                <a href="components/UserDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInviteFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInviteFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserconfirmationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserconfirmationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' : 'data-bs-target="#xs-injectables-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' :
                                        'id="xs-injectables-links-module-UserModule-85468e7560bce4b80c696028c05bb2878ef2a1bca7c8132f5a8bb9870361a56d2dc853323ce80c54e26914259ad3233b1267fdc2266dc17a301a5689ab1ab78f"' }>
                                        <li class="link">
                                            <a href="injectables/RouterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsExamplesModule.html" data-type="entity-link" >WidgetsExamplesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-WidgetsExamplesModule-67cd18a476564c4374b5885df23306bf4e4c696cfd0d970f276f3a8a2fb232cc9192c3c4d480493c677dc6f978abc142590f1dcdf83a2370f9c3ed7232e590c3"' : 'data-bs-target="#xs-components-links-module-WidgetsExamplesModule-67cd18a476564c4374b5885df23306bf4e4c696cfd0d970f276f3a8a2fb232cc9192c3c4d480493c677dc6f978abc142590f1dcdf83a2370f9c3ed7232e590c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WidgetsExamplesModule-67cd18a476564c4374b5885df23306bf4e4c696cfd0d970f276f3a8a2fb232cc9192c3c4d480493c677dc6f978abc142590f1dcdf83a2370f9c3ed7232e590c3"' :
                                            'id="xs-components-links-module-WidgetsExamplesModule-67cd18a476564c4374b5885df23306bf4e4c696cfd0d970f276f3a8a2fb232cc9192c3c4d480493c677dc6f978abc142590f1dcdf83a2370f9c3ed7232e590c3"' }>
                                            <li class="link">
                                                <a href="components/ChartsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatisticsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetsExamplesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetsExamplesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsExamplesRoutingModule.html" data-type="entity-link" >WidgetsExamplesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetsModule.html" data-type="entity-link" >WidgetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-WidgetsModule-1637b8ca798e628de81db2f1a56f467a53ed178d49d4676b2f37e80258fa76b7fc6bb0765c9257c7bfa0c9a3c18ef6fc7e87b8405fbb17e2498692ebb4622ba0"' : 'data-bs-target="#xs-components-links-module-WidgetsModule-1637b8ca798e628de81db2f1a56f467a53ed178d49d4676b2f37e80258fa76b7fc6bb0765c9257c7bfa0c9a3c18ef6fc7e87b8405fbb17e2498692ebb4622ba0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WidgetsModule-1637b8ca798e628de81db2f1a56f467a53ed178d49d4676b2f37e80258fa76b7fc6bb0765c9257c7bfa0c9a3c18ef6fc7e87b8405fbb17e2498692ebb4622ba0"' :
                                            'id="xs-components-links-module-WidgetsModule-1637b8ca798e628de81db2f1a56f467a53ed178d49d4676b2f37e80258fa76b7fc6bb0765c9257c7bfa0c9a3c18ef6fc7e87b8405fbb17e2498692ebb4622ba0"' }>
                                            <li class="link">
                                                <a href="components/AdvanceTablesWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdvanceTablesWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdvanceTablesWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdvanceTablesWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdvanceTablesWidget7Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdvanceTablesWidget7Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BaseTablesWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BaseTablesWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BaseTablesWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BaseTablesWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BaseTablesWidget6Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BaseTablesWidget6Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardsWidget17Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsWidget17Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardsWidget18Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsWidget18Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardsWidget20Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsWidget20Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardsWidget7Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsWidget7Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget6Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget6Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget7Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget7Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartsWidget8Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartsWidget8Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EngageWidget10Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EngageWidget10Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedsWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedsWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedsWidget3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedsWidget3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedsWidget4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedsWidget4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedsWidget5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedsWidget5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeedsWidget6Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeedsWidget6Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget26Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget26Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget6Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget6Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget7Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget7Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListsWidget8Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListsWidget8Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget10Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget10Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget11Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget11Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget6Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget6Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget7Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget7Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget8Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget8Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MixedWidget9Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MixedWidget9Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewChartsWidget8Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewChartsWidget8Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatsWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatsWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatsWidget3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsWidget3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatsWidget4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsWidget4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatsWidget5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsWidget5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatsWidget6Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsWidget6Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget10Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget10Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget11Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget11Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget12Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget12Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget13Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget13Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget14Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget14Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget16Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget16Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget6Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget6Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget7Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget7Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget8Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget8Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesWidget9Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesWidget9Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TilesWidget10Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TilesWidget10Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TilesWidget11Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TilesWidget11Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TilesWidget12Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TilesWidget12Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TilesWidget13Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TilesWidget13Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TilesWidget14Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TilesWidget14Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TilesWidget1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TilesWidget1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TilesWidget3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TilesWidget3Component</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WizardsModule.html" data-type="entity-link" >WizardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-WizardsModule-c53f58a94fdc4c6eafcea0557d7ad588093a495be737e30316237eb86d4e8a042c3ca67299a8fb96765add0c2b0479cf8867a03b04d594d1c036a750c00503aa"' : 'data-bs-target="#xs-components-links-module-WizardsModule-c53f58a94fdc4c6eafcea0557d7ad588093a495be737e30316237eb86d4e8a042c3ca67299a8fb96765add0c2b0479cf8867a03b04d594d1c036a750c00503aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WizardsModule-c53f58a94fdc4c6eafcea0557d7ad588093a495be737e30316237eb86d4e8a042c3ca67299a8fb96765add0c2b0479cf8867a03b04d594d1c036a750c00503aa"' :
                                            'id="xs-components-links-module-WizardsModule-c53f58a94fdc4c6eafcea0557d7ad588093a495be737e30316237eb86d4e8a042c3ca67299a8fb96765add0c2b0479cf8867a03b04d594d1c036a750c00503aa"' }>
                                            <li class="link">
                                                <a href="components/HorizontalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HorizontalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Step1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Step1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Step2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Step2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Step3Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Step3Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Step4Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Step4Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Step5Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Step5Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerticalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerticalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WizardsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WizardsRoutingModule.html" data-type="entity-link" >WizardsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AddCostCenterComponent-1.html" data-type="entity-link" >AddCostCenterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent-8.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppInfoListComponent.html" data-type="entity-link" >AppInfoListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BussinessOwnersListComponent.html" data-type="entity-link" >BussinessOwnersListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonMicroComponent.html" data-type="entity-link" >ButtonMicroComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompaniesDetailsInfoComponent.html" data-type="entity-link" >CompaniesDetailsInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent-2.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DataTableComponent.html" data-type="entity-link" >DataTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DomainSpaceInfoComponent.html" data-type="entity-link" >DomainSpaceInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditBussinessOwnerComponent.html" data-type="entity-link" >EditBussinessOwnerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditMultipeFilesComponent.html" data-type="entity-link" >EditMultipeFilesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FieldValidationsComponent.html" data-type="entity-link" >FieldValidationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormGroupComponent.html" data-type="entity-link" >FormGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePageComponent-1.html" data-type="entity-link" >HomePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LabelComponent.html" data-type="entity-link" >LabelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPageComponent.html" data-type="entity-link" >LandingPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutComponent.html" data-type="entity-link" >LayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutComponent-2.html" data-type="entity-link" >LayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutHeaderComponent-1.html" data-type="entity-link" >LayoutHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutSidebarComponent-1.html" data-type="entity-link" >LayoutSidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LicenceInfoListComponent.html" data-type="entity-link" >LicenceInfoListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderComponent.html" data-type="entity-link" >LoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginRedirectComponent.html" data-type="entity-link" >LoginRedirectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoutComponent.html" data-type="entity-link" >LogoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoutRedirectComponent.html" data-type="entity-link" >LogoutRedirectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MultiSelectComponent.html" data-type="entity-link" >MultiSelectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoChildrenAccountsComponent-1.html" data-type="entity-link" >NoChildrenAccountsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoChildrenAccountsComponent-2.html" data-type="entity-link" >NoChildrenAccountsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OverviewComponent-1.html" data-type="entity-link" >OverviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchEngineComponent.html" data-type="entity-link" >SearchEngineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectComponent.html" data-type="entity-link" >SelectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectSubdomainComponent.html" data-type="entity-link" >SelectSubdomainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SharedFormComponent.html" data-type="entity-link" >SharedFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpinnerComponent-1.html" data-type="entity-link" >SpinnerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TablePaginatorComponent.html" data-type="entity-link" >TablePaginatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TablePrintComponent.html" data-type="entity-link" >TablePrintComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TabviewComponent.html" data-type="entity-link" >TabviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextInputComponent.html" data-type="entity-link" >TextInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToastComponent.html" data-type="entity-link" >ToastComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToggelComponent.html" data-type="entity-link" >ToggelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnAuthorizedComponent.html" data-type="entity-link" >UnAuthorizedComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserInfoListComponent.html" data-type="entity-link" >UserInfoListComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/LoaderDirective-1.html" data-type="entity-link" >LoaderDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddJournalEntryCommand.html" data-type="entity-link" >AddJournalEntryCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddJournalEntryCommandOpeningBalance.html" data-type="entity-link" >AddJournalEntryCommandOpeningBalance</a>
                            </li>
                            <li class="link">
                                <a href="classes/AttachmentDto.html" data-type="entity-link" >AttachmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BankAccountViewDto.html" data-type="entity-link" >BankAccountViewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BankDefinitionDto.html" data-type="entity-link" >BankDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BankDefinitionDto-1.html" data-type="entity-link" >BankDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BreadcrumbLabel.html" data-type="entity-link" >BreadcrumbLabel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDropdownDto.html" data-type="entity-link" >CategoryDropdownDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDropdownDto-1.html" data-type="entity-link" >CategoryDropdownDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDropdownDto-2.html" data-type="entity-link" >CategoryDropdownDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDropdownDto-3.html" data-type="entity-link" >CategoryDropdownDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CityDto.html" data-type="entity-link" >CityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CityDto-1.html" data-type="entity-link" >CityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CityDto-2.html" data-type="entity-link" >CityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CityDto-3.html" data-type="entity-link" >CityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CityDto-4.html" data-type="entity-link" >CityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CookieComponent.html" data-type="entity-link" >CookieComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/costLookup.html" data-type="entity-link" >costLookup</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryDto.html" data-type="entity-link" >CountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryDto-1.html" data-type="entity-link" >CountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryDto-2.html" data-type="entity-link" >CountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryDto-3.html" data-type="entity-link" >CountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryDto-4.html" data-type="entity-link" >CountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountryDto-5.html" data-type="entity-link" >CountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHelpPageDto.html" data-type="entity-link" >CreateHelpPageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataTableColumn.html" data-type="entity-link" >DataTableColumn</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataTableColumn-1.html" data-type="entity-link" >DataTableColumn</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataUtil.html" data-type="entity-link" >DataUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/DOMEventHandlerUtil.html" data-type="entity-link" >DOMEventHandlerUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/DrawerComponent.html" data-type="entity-link" >DrawerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/DrawerStore.html" data-type="entity-link" >DrawerStore</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditHelpPageDetailsDto.html" data-type="entity-link" >EditHelpPageDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditJournalEntry.html" data-type="entity-link" >EditJournalEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditJournalEntryAttachment.html" data-type="entity-link" >EditJournalEntryAttachment</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditJournalEntryLine.html" data-type="entity-link" >EditJournalEntryLine</a>
                            </li>
                            <li class="link">
                                <a href="classes/ElementAnimateUtil.html" data-type="entity-link" >ElementAnimateUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/ElementStyleUtil.html" data-type="entity-link" >ElementStyleUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeeDto.html" data-type="entity-link" >EmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventHandlerUtil.html" data-type="entity-link" >EventHandlerUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExportService.html" data-type="entity-link" >ExportService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FeedbackComponent.html" data-type="entity-link" >FeedbackComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDto.html" data-type="entity-link" >FileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileTypeMetaData.html" data-type="entity-link" >FileTypeMetaData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterDto.html" data-type="entity-link" >FilterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllJournalTemplateDto.html" data-type="entity-link" >GetAllJournalTemplateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEmployeeView.html" data-type="entity-link" >GetEmployeeView</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGlOpeningBalanceById.html" data-type="entity-link" >GetGlOpeningBalanceById</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetJournalTemplateDto.html" data-type="entity-link" >GetJournalTemplateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetJournalTemplateLinesDto.html" data-type="entity-link" >GetJournalTemplateLinesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HeaderParams.html" data-type="entity-link" >HeaderParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageInputComponent.html" data-type="entity-link" >ImageInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemTypeDto.html" data-type="entity-link" >ItemTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemTypeDto-1.html" data-type="entity-link" >ItemTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalEntryDto.html" data-type="entity-link" >JournalEntryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalEntryFormValue.html" data-type="entity-link" >JournalEntryFormValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalEntryGlBalanceLineDto.html" data-type="entity-link" >JournalEntryGlBalanceLineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalEntryLineFormValue.html" data-type="entity-link" >JournalEntryLineFormValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalItemModel.html" data-type="entity-link" >JournalItemModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalStatusUpdate.html" data-type="entity-link" >JournalStatusUpdate</a>
                            </li>
                            <li class="link">
                                <a href="classes/LowerCaseUrlSerializer.html" data-type="entity-link" >LowerCaseUrlSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuComponent.html" data-type="entity-link" >MenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/MultiTranslateHttpLoader.html" data-type="entity-link" >MultiTranslateHttpLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/NationalityDto.html" data-type="entity-link" >NationalityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageInfo.html" data-type="entity-link" >PageInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageInfo-1.html" data-type="entity-link" >PageInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaidByDropDown.html" data-type="entity-link" >PaidByDropDown</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaidByDropDown-1.html" data-type="entity-link" >PaidByDropDown</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordMeterComponent.html" data-type="entity-link" >PasswordMeterComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentMethodDto.html" data-type="entity-link" >PaymentMethodDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentMethodDto-1.html" data-type="entity-link" >PaymentMethodDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentTermDto.html" data-type="entity-link" >PaymentTermDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentTermDto-1.html" data-type="entity-link" >PaymentTermDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/reportAccount.html" data-type="entity-link" >reportAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/reportCostAllData.html" data-type="entity-link" >reportCostAllData</a>
                            </li>
                            <li class="link">
                                <a href="classes/reportCostCenter.html" data-type="entity-link" >reportCostCenter</a>
                            </li>
                            <li class="link">
                                <a href="classes/reportJurnalAccountDto.html" data-type="entity-link" >reportJurnalAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/reportTrialDto.html" data-type="entity-link" >reportTrialDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteParams.html" data-type="entity-link" >RouteParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScrollComponent.html" data-type="entity-link" >ScrollComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScrollTopComponent.html" data-type="entity-link" >ScrollTopComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchComponent.html" data-type="entity-link" >SearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StepperComponent.html" data-type="entity-link" >StepperComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StickyComponent.html" data-type="entity-link" >StickyComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageKeys.html" data-type="entity-link" >StorageKeys</a>
                            </li>
                            <li class="link">
                                <a href="classes/SwapperComponent.html" data-type="entity-link" >SwapperComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/SwapperStore.html" data-type="entity-link" >SwapperStore</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableConfig.html" data-type="entity-link" >TableConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableConfig-1.html" data-type="entity-link" >TableConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThemeMode.html" data-type="entity-link" >ThemeMode</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleComponent.html" data-type="entity-link" >ToggleComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrialBalance.html" data-type="entity-link" >TrialBalance</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadFileConfigDto.html" data-type="entity-link" >UploadFileConfigDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewBankDto.html" data-type="entity-link" >ViewBankDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountProxy.html" data-type="entity-link" >AccountProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link" >AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AgeService.html" data-type="entity-link" >AgeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppStoreProxy.html" data-type="entity-link" >AppStoreProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppStoreService.html" data-type="entity-link" >AppStoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AttachmentsService.html" data-type="entity-link" >AttachmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthProxy.html" data-type="entity-link" >AuthProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/breadCrumbHome.html" data-type="entity-link" >breadCrumbHome</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BreadcrumbService.html" data-type="entity-link" >BreadcrumbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BussinessOwnerProxyService.html" data-type="entity-link" >BussinessOwnerProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BussinessOwnerService.html" data-type="entity-link" >BussinessOwnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CMSProxyService.html" data-type="entity-link" >CMSProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CMSService.html" data-type="entity-link" >CMSService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyProxy.html" data-type="entity-link" >CompanyProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyService.html" data-type="entity-link" >CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CookieStorageService.html" data-type="entity-link" >CookieStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoreService.html" data-type="entity-link" >CoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrencyProxy.html" data-type="entity-link" >CurrencyProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrencyProxy-1.html" data-type="entity-link" >CurrencyProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrencyService.html" data-type="entity-link" >CurrencyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrencyService-1.html" data-type="entity-link" >CurrencyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrentUserService.html" data-type="entity-link" >CurrentUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardService.html" data-type="entity-link" >DashboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DateTimeService.html" data-type="entity-link" >DateTimeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeProxy.html" data-type="entity-link" >EmployeeProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link" >EmployeeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EnvironmentService.html" data-type="entity-link" >EnvironmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ERPUserProxy.html" data-type="entity-link" >ERPUserProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ERPUserService.html" data-type="entity-link" >ERPUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportService.html" data-type="entity-link" >ExportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinanceProxyService.html" data-type="entity-link" >FinanceProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinanceService.html" data-type="entity-link" >FinanceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormsService.html" data-type="entity-link" >FormsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeneralService.html" data-type="entity-link" >GeneralService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeneralSettingProxy.html" data-type="entity-link" >GeneralSettingProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeneralSettingService.html" data-type="entity-link" >GeneralSettingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelpPageProxyService.html" data-type="entity-link" >HelpPageProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelpPageService.html" data-type="entity-link" >HelpPageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelpPageService-1.html" data-type="entity-link" >HelpPageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link" >HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemsProxyService.html" data-type="entity-link" >ItemsProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemsService.html" data-type="entity-link" >ItemsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JournalEntryProxy.html" data-type="entity-link" >JournalEntryProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JournalEntryService.html" data-type="entity-link" >JournalEntryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguageService.html" data-type="entity-link" >LanguageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutInitService.html" data-type="entity-link" >LayoutInitService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutProxy.html" data-type="entity-link" >LayoutProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link" >LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService-1.html" data-type="entity-link" >LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogService.html" data-type="entity-link" >LogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LookupsService.html" data-type="entity-link" >LookupsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageInfoService.html" data-type="entity-link" >PageInfoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrintService.html" data-type="entity-link" >PrintService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProxyService.html" data-type="entity-link" >ProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PurchaseProxyService.html" data-type="entity-link" >PurchaseProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PurchaseService.html" data-type="entity-link" >PurchaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PurchaseTransactionsProxyService.html" data-type="entity-link" >PurchaseTransactionsProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PurchaseTransactionsService.html" data-type="entity-link" >PurchaseTransactionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportProxyService.html" data-type="entity-link" >ReportProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link" >ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportsProxy.html" data-type="entity-link" >ReportsProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportsService.html" data-type="entity-link" >ReportsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterService.html" data-type="entity-link" >RouterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SalesProxyService.html" data-type="entity-link" >SalesProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SalesService.html" data-type="entity-link" >SalesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/sequenceProxy.html" data-type="entity-link" >sequenceProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SequenceService.html" data-type="entity-link" >SequenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionStorageService.html" data-type="entity-link" >SessionStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedBussinessOwnerEnums.html" data-type="entity-link" >SharedBussinessOwnerEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Sharedcompanyenums.html" data-type="entity-link" >Sharedcompanyenums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedCostEnums.html" data-type="entity-link" >SharedCostEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedEmployeeEnums.html" data-type="entity-link" >SharedEmployeeEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedEnum.html" data-type="entity-link" >SharedEnum</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedEnums.html" data-type="entity-link" >SharedEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedEnums-1.html" data-type="entity-link" >SharedEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFinanceEnums.html" data-type="entity-link" >SharedFinanceEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFinanceEnums-1.html" data-type="entity-link" >SharedFinanceEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFinanceEnums-2.html" data-type="entity-link" >SharedFinanceEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFinanceEnums-3.html" data-type="entity-link" >SharedFinanceEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFinanceEnums-4.html" data-type="entity-link" >SharedFinanceEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFinanceReportEnums.html" data-type="entity-link" >SharedFinanceReportEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedFinanceTranscationEnums.html" data-type="entity-link" >SharedFinanceTranscationEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedJournalEnums.html" data-type="entity-link" >SharedJournalEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedLibraryEnums.html" data-type="entity-link" >SharedLibraryEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedPurchaseEnums.html" data-type="entity-link" >SharedPurchaseEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedSalesEnums.html" data-type="entity-link" >SharedSalesEnums</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedStock.html" data-type="entity-link" >SharedStock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedStock-1.html" data-type="entity-link" >SharedStock</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SplashScreenService.html" data-type="entity-link" >SplashScreenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubdomainService.html" data-type="entity-link" >SubdomainService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionProxy.html" data-type="entity-link" >SubscriptionProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionService.html" data-type="entity-link" >SubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeModeService.html" data-type="entity-link" >ThemeModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TitleService.html" data-type="entity-link" >TitleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToasterService.html" data-type="entity-link" >ToasterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionsProxyService.html" data-type="entity-link" >TransactionsProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionsService.html" data-type="entity-link" >TransactionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranscationsProxyService.html" data-type="entity-link" >TranscationsProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranscationsService.html" data-type="entity-link" >TranscationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslationService.html" data-type="entity-link" >TranslationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UnauthGuard.html" data-type="entity-link" >UnauthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserProxy.html" data-type="entity-link" >UserProxy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ERPInterceptor.html" data-type="entity-link" >ERPInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountBalanceDto.html" data-type="entity-link" >AccountBalanceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/accountById.html" data-type="entity-link" >accountById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountByIdDto.html" data-type="entity-link" >AccountByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountDto.html" data-type="entity-link" >AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountDto-1.html" data-type="entity-link" >AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountDto-2.html" data-type="entity-link" >AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountDto-3.html" data-type="entity-link" >AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountDto-4.html" data-type="entity-link" >AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountingInfo.html" data-type="entity-link" >AccountingInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountingInfo-1.html" data-type="entity-link" >AccountingInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountingInfo-2.html" data-type="entity-link" >AccountingInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountsChildrenDropDown.html" data-type="entity-link" >AccountsChildrenDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountsChildrenDropDown-1.html" data-type="entity-link" >AccountsChildrenDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountsData.html" data-type="entity-link" >AccountsData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountSectionDropDownDto.html" data-type="entity-link" >AccountSectionDropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/accountTreeList.html" data-type="entity-link" >accountTreeList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountTypeDropDownDto.html" data-type="entity-link" >AccountTypeDropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddAccountDto.html" data-type="entity-link" >AddAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addAttributeDifintion.html" data-type="entity-link" >addAttributeDifintion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addAttributeDifintion-1.html" data-type="entity-link" >addAttributeDifintion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddBankDto.html" data-type="entity-link" >AddBankDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddBankDto-1.html" data-type="entity-link" >AddBankDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addBarcode.html" data-type="entity-link" >addBarcode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addBarcode-1.html" data-type="entity-link" >addBarcode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCMS.html" data-type="entity-link" >AddCMS</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddConfirmedUserDto.html" data-type="entity-link" >AddConfirmedUserDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addCostCenter.html" data-type="entity-link" >addCostCenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerCategoryDto.html" data-type="entity-link" >AddCustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerCategoryDto-1.html" data-type="entity-link" >AddCustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerCategoryDto-2.html" data-type="entity-link" >AddCustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerDefinitionDto.html" data-type="entity-link" >AddCustomerDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerDefinitionDto-1.html" data-type="entity-link" >AddCustomerDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerDefinitionDto-2.html" data-type="entity-link" >AddCustomerDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerOpeningBalanceDetailDto.html" data-type="entity-link" >AddCustomerOpeningBalanceDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddCustomerOpeningBalanceDto.html" data-type="entity-link" >AddCustomerOpeningBalanceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddDomainSpaceDto.html" data-type="entity-link" >AddDomainSpaceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddEmployeePersonal.html" data-type="entity-link" >AddEmployeePersonal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddFinancialCalendar.html" data-type="entity-link" >AddFinancialCalendar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddFinancialCalendar-1.html" data-type="entity-link" >AddFinancialCalendar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addFixedCost.html" data-type="entity-link" >addFixedCost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddGeneralDto.html" data-type="entity-link" >AddGeneralDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddGeneralDto-1.html" data-type="entity-link" >AddGeneralDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddHelpPage.html" data-type="entity-link" >AddHelpPage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddInvoiceCommand.html" data-type="entity-link" >AddInvoiceCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddInvoiceDetailDto.html" data-type="entity-link" >AddInvoiceDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddInvoiceTrackingDto.html" data-type="entity-link" >AddInvoiceTrackingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddItemCategory.html" data-type="entity-link" >AddItemCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddItemCategory-1.html" data-type="entity-link" >AddItemCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddItemDefinitionDto.html" data-type="entity-link" >AddItemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddItemDefinitionDto-1.html" data-type="entity-link" >AddItemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddLevelsDto.html" data-type="entity-link" >AddLevelsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddOpeningBalanceDueDatesDto.html" data-type="entity-link" >AddOpeningBalanceDueDatesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddOperatioalTag.html" data-type="entity-link" >AddOperatioalTag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddOperatioalTag-1.html" data-type="entity-link" >AddOperatioalTag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPaymentMethodDto.html" data-type="entity-link" >AddPaymentMethodDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPaymentMethodDto-1.html" data-type="entity-link" >AddPaymentMethodDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPaymentTermDto.html" data-type="entity-link" >AddPaymentTermDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPaymentTermDto-1.html" data-type="entity-link" >AddPaymentTermDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPaymentTermLinesDto.html" data-type="entity-link" >AddPaymentTermLinesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPaymentTermLinesDto-1.html" data-type="entity-link" >AddPaymentTermLinesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPurchaseInvoiceDto.html" data-type="entity-link" >AddPurchaseInvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressInfo.html" data-type="entity-link" >AddressInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressInfo-1.html" data-type="entity-link" >AddressInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressInfo-2.html" data-type="entity-link" >AddressInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressWarehouse.html" data-type="entity-link" >AddressWarehouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressWarehouse-1.html" data-type="entity-link" >AddressWarehouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressWarehouseData.html" data-type="entity-link" >AddressWarehouseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressWarehouseData-1.html" data-type="entity-link" >AddressWarehouseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddStockIn.html" data-type="entity-link" >AddStockIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddStockIn-1.html" data-type="entity-link" >AddStockIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddStockOutDto.html" data-type="entity-link" >AddStockOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddStockOutDto-1.html" data-type="entity-link" >AddStockOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddStockOutDto-2.html" data-type="entity-link" >AddStockOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddStockOutDto-3.html" data-type="entity-link" >AddStockOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddTagDto.html" data-type="entity-link" >AddTagDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddTagDto-1.html" data-type="entity-link" >AddTagDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddTagDto-2.html" data-type="entity-link" >AddTagDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddTax.html" data-type="entity-link" >AddTax</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddTaxGroupDto.html" data-type="entity-link" >AddTaxGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddToCartDto.html" data-type="entity-link" >AddToCartDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddTreasuryDto.html" data-type="entity-link" >AddTreasuryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddTreasuryDto-1.html" data-type="entity-link" >AddTreasuryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddUom.html" data-type="entity-link" >AddUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addUOM.html" data-type="entity-link" >addUOM</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddUom-1.html" data-type="entity-link" >AddUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/addUOM-1.html" data-type="entity-link" >addUOM</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVariantLine.html" data-type="entity-link" >AddVariantLine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVariantLine-1.html" data-type="entity-link" >AddVariantLine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorAccountingDto.html" data-type="entity-link" >AddVendorAccountingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorAccountingDto-1.html" data-type="entity-link" >AddVendorAccountingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorAccountingDto-2.html" data-type="entity-link" >AddVendorAccountingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorAddressDto.html" data-type="entity-link" >AddVendorAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorAddressDto-1.html" data-type="entity-link" >AddVendorAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorAddressDto-2.html" data-type="entity-link" >AddVendorAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorCategory.html" data-type="entity-link" >AddVendorCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorCategory-1.html" data-type="entity-link" >AddVendorCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorCategory-2.html" data-type="entity-link" >AddVendorCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorCommand.html" data-type="entity-link" >AddVendorCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorCommand-1.html" data-type="entity-link" >AddVendorCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorCommand-2.html" data-type="entity-link" >AddVendorCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorFinancialDto.html" data-type="entity-link" >AddVendorFinancialDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorFinancialDto-1.html" data-type="entity-link" >AddVendorFinancialDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorFinancialDto-2.html" data-type="entity-link" >AddVendorFinancialDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorInformationDto.html" data-type="entity-link" >AddVendorInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorInformationDto-1.html" data-type="entity-link" >AddVendorInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorInformationDto-2.html" data-type="entity-link" >AddVendorInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorLegalDto.html" data-type="entity-link" >AddVendorLegalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorLegalDto-1.html" data-type="entity-link" >AddVendorLegalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorLegalDto-2.html" data-type="entity-link" >AddVendorLegalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddVendorOpeningBalanceDto.html" data-type="entity-link" >AddVendorOpeningBalanceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddWarehouse.html" data-type="entity-link" >AddWarehouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddWarehouse-1.html" data-type="entity-link" >AddWarehouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdvancedSearchDto.html" data-type="entity-link" >AdvancedSearchDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdvancedSearchDto-1.html" data-type="entity-link" >AdvancedSearchDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdvancedSearchDto-2.html" data-type="entity-link" >AdvancedSearchDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertModel.html" data-type="entity-link" >AlertModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/APIValidationError.html" data-type="entity-link" >APIValidationError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppDto.html" data-type="entity-link" >AppDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppsInfo.html" data-type="entity-link" >AppsInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Attribute.html" data-type="entity-link" >Attribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AttributesVariants.html" data-type="entity-link" >AttributesVariants</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AttributesVariants-1.html" data-type="entity-link" >AttributesVariants</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthenticationResponse.html" data-type="entity-link" >AuthenticationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Balance.html" data-type="entity-link" >Balance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Balance-1.html" data-type="entity-link" >Balance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccount.html" data-type="entity-link" >BankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccount-1.html" data-type="entity-link" >BankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccount-2.html" data-type="entity-link" >BankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccount-3.html" data-type="entity-link" >BankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccount-4.html" data-type="entity-link" >BankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccount-5.html" data-type="entity-link" >BankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccount-6.html" data-type="entity-link" >BankAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccountStatementDto.html" data-type="entity-link" >BankAccountStatementDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccountStatementfilterDto.html" data-type="entity-link" >BankAccountStatementfilterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccountStatementLinesDto.html" data-type="entity-link" >BankAccountStatementLinesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccountWithCurrency.html" data-type="entity-link" >BankAccountWithCurrency</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccountWithCurrency-1.html" data-type="entity-link" >BankAccountWithCurrency</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankAccountWithCurrency-2.html" data-type="entity-link" >BankAccountWithCurrency</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/bankByID.html" data-type="entity-link" >bankByID</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/bankByID-1.html" data-type="entity-link" >bankByID</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankPaymentMethods.html" data-type="entity-link" >BankPaymentMethods</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankPaymentMethods-1.html" data-type="entity-link" >BankPaymentMethods</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Barcode.html" data-type="entity-link" >Barcode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Barcode-1.html" data-type="entity-link" >Barcode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseDto.html" data-type="entity-link" >BaseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Branch.html" data-type="entity-link" >Branch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Branch-1.html" data-type="entity-link" >Branch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BranchDto.html" data-type="entity-link" >BranchDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BranchWarehouse.html" data-type="entity-link" >BranchWarehouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BranchWarehouse-1.html" data-type="entity-link" >BranchWarehouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/bussinesOwnerDetails.html" data-type="entity-link" >bussinesOwnerDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BussinessOwner.html" data-type="entity-link" >BussinessOwner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardReportQuery.html" data-type="entity-link" >CardReportQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartDto.html" data-type="entity-link" >CartDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartItemDto.html" data-type="entity-link" >CartItemDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/City.html" data-type="entity-link" >City</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CMSList.html" data-type="entity-link" >CMSList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyAddressDto.html" data-type="entity-link" >CompanyAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyContactDto.html" data-type="entity-link" >CompanyContactDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyDataDto.html" data-type="entity-link" >CompanyDataDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/companyDropDownDto.html" data-type="entity-link" >companyDropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyDto.html" data-type="entity-link" >CompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyHierarchyDto.html" data-type="entity-link" >CompanyHierarchyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyInfo.html" data-type="entity-link" >CompanyInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyLegalDto.html" data-type="entity-link" >CompanyLegalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Condition.html" data-type="entity-link" >Condition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContactInfo.html" data-type="entity-link" >ContactInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContactInfo-1.html" data-type="entity-link" >ContactInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContactInfo-2.html" data-type="entity-link" >ContactInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costById.html" data-type="entity-link" >costById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CostCenter.html" data-type="entity-link" >CostCenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenter.html" data-type="entity-link" >costCenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenterActivation.html" data-type="entity-link" >costCenterActivation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenterDetails.html" data-type="entity-link" >costCenterDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenterList.html" data-type="entity-link" >costCenterList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenterOpeningBalance.html" data-type="entity-link" >costCenterOpeningBalance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenters.html" data-type="entity-link" >costCenters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenters-1.html" data-type="entity-link" >costCenters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costCenters-2.html" data-type="entity-link" >costCenters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/costTree.html" data-type="entity-link" >costTree</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateBranch.html" data-type="entity-link" >CreateBranch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateCompany.html" data-type="entity-link" >CreateCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateInvitedUser.html" data-type="entity-link" >CreateInvitedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateJournalEntryAttachment.html" data-type="entity-link" >CreateJournalEntryAttachment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateJournalEntryAttachmentOpeningBalance.html" data-type="entity-link" >CreateJournalEntryAttachmentOpeningBalance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateJournalEntryLine.html" data-type="entity-link" >CreateJournalEntryLine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateJournalEntryLineOpeningBalance.html" data-type="entity-link" >CreateJournalEntryLineOpeningBalance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyConversionDto.html" data-type="entity-link" >CurrencyConversionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyDefinitionDto.html" data-type="entity-link" >CurrencyDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyDto.html" data-type="entity-link" >CurrencyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyDto-1.html" data-type="entity-link" >CurrencyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyDto-2.html" data-type="entity-link" >CurrencyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyDto-3.html" data-type="entity-link" >CurrencyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyDto-4.html" data-type="entity-link" >CurrencyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyDto-5.html" data-type="entity-link" >CurrencyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/currencyListDto.html" data-type="entity-link" >currencyListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyRateDto.html" data-type="entity-link" >CurrencyRateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyRateDto-1.html" data-type="entity-link" >CurrencyRateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyRateDto-2.html" data-type="entity-link" >CurrencyRateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyRateDto-3.html" data-type="entity-link" >CurrencyRateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerCategoryDto.html" data-type="entity-link" >CustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerCategoryDto-1.html" data-type="entity-link" >CustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerCategoryDto-2.html" data-type="entity-link" >CustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerDefinitionDto.html" data-type="entity-link" >CustomerDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerDropDown.html" data-type="entity-link" >CustomerDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerDropDown-1.html" data-type="entity-link" >CustomerDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerDropDown-2.html" data-type="entity-link" >CustomerDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateOftheYear.html" data-type="entity-link" >DateOftheYear</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultExceptionModel.html" data-type="entity-link" >DefaultExceptionModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerOptions.html" data-type="entity-link" >DrawerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropDownDto.html" data-type="entity-link" >DropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropDownDto-1.html" data-type="entity-link" >DropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropDownDto-2.html" data-type="entity-link" >DropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropDownDto-3.html" data-type="entity-link" >DropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditAttributes.html" data-type="entity-link" >EditAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditAttributes-1.html" data-type="entity-link" >EditAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/editBranch.html" data-type="entity-link" >editBranch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerCategoryDto.html" data-type="entity-link" >EditCustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerCategoryDto-1.html" data-type="entity-link" >EditCustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerCategoryDto-2.html" data-type="entity-link" >EditCustomerCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerDefintionsDto.html" data-type="entity-link" >EditCustomerDefintionsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerDefintionsDto-1.html" data-type="entity-link" >EditCustomerDefintionsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerDefintionsDto-2.html" data-type="entity-link" >EditCustomerDefintionsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerOpeningBalanceDetailDto.html" data-type="entity-link" >EditCustomerOpeningBalanceDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditCustomerOpeningBalanceDto.html" data-type="entity-link" >EditCustomerOpeningBalanceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditEmployeePersonal.html" data-type="entity-link" >EditEmployeePersonal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/editFinancialCalndar.html" data-type="entity-link" >editFinancialCalndar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/editFinancialCalndar-1.html" data-type="entity-link" >editFinancialCalndar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditItemDefinitionDto.html" data-type="entity-link" >EditItemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditItemDefinitionDto-1.html" data-type="entity-link" >EditItemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditOpeningBalanceDueDatesDto.html" data-type="entity-link" >EditOpeningBalanceDueDatesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditTax.html" data-type="entity-link" >EditTax</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditTreasuryDto.html" data-type="entity-link" >EditTreasuryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditTreasuryDto-1.html" data-type="entity-link" >EditTreasuryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditUserModel.html" data-type="entity-link" >EditUserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorAccountingDto.html" data-type="entity-link" >EditVendorAccountingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorAccountingDto-1.html" data-type="entity-link" >EditVendorAccountingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorAccountingDto-2.html" data-type="entity-link" >EditVendorAccountingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorAddressDto.html" data-type="entity-link" >EditVendorAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorAddressDto-1.html" data-type="entity-link" >EditVendorAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorAddressDto-2.html" data-type="entity-link" >EditVendorAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorCategoryDto.html" data-type="entity-link" >EditVendorCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorCategoryDto-1.html" data-type="entity-link" >EditVendorCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorCategoryDto-2.html" data-type="entity-link" >EditVendorCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorCommand.html" data-type="entity-link" >EditVendorCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorCommand-1.html" data-type="entity-link" >EditVendorCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorCommand-2.html" data-type="entity-link" >EditVendorCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorFinancialDto.html" data-type="entity-link" >EditVendorFinancialDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorFinancialDto-1.html" data-type="entity-link" >EditVendorFinancialDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorFinancialDto-2.html" data-type="entity-link" >EditVendorFinancialDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorInformationDto.html" data-type="entity-link" >EditVendorInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorInformationDto-1.html" data-type="entity-link" >EditVendorInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorInformationDto-2.html" data-type="entity-link" >EditVendorInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorLegalDto.html" data-type="entity-link" >EditVendorLegalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorLegalDto-1.html" data-type="entity-link" >EditVendorLegalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditVendorLegalDto-2.html" data-type="entity-link" >EditVendorLegalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditWareHouse.html" data-type="entity-link" >EditWareHouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditWareHouse-1.html" data-type="entity-link" >EditWareHouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventMeta.html" data-type="entity-link" >EventMeta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportAccountsDto.html" data-type="entity-link" >ExportAccountsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportBranchesDto.html" data-type="entity-link" >ExportBranchesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportCompanyDto.html" data-type="entity-link" >ExportCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportCurrencyConversionDto.html" data-type="entity-link" >ExportCurrencyConversionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportTagDto.html" data-type="entity-link" >ExportTagDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportTaxDto.html" data-type="entity-link" >ExportTaxDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportUserListResponse.html" data-type="entity-link" >ExportUserListResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FeedbackOptions.html" data-type="entity-link" >FeedbackOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/financialCalendar.html" data-type="entity-link" >financialCalendar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/financialCalendar-1.html" data-type="entity-link" >financialCalendar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FinancialInfo.html" data-type="entity-link" >FinancialInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FinancialInfo-1.html" data-type="entity-link" >FinancialInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FinancialInfo-2.html" data-type="entity-link" >FinancialInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FinancialYearPeriod.html" data-type="entity-link" >FinancialYearPeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FinancialYearPeriod-1.html" data-type="entity-link" >FinancialYearPeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FixedCost.html" data-type="entity-link" >FixedCost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormConfig.html" data-type="entity-link" >FormConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeneralSettingDto.html" data-type="entity-link" >GeneralSettingDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetAllCustomerOpeningBalanceDto.html" data-type="entity-link" >GetAllCustomerOpeningBalanceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetAllPaymentInDto.html" data-type="entity-link" >GetAllPaymentInDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetAllPaymentInDto-1.html" data-type="entity-link" >GetAllPaymentInDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetAllPaymentOutDto.html" data-type="entity-link" >GetAllPaymentOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetBalanceDueDatesDto.html" data-type="entity-link" >GetBalanceDueDatesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetBalanceDueDatesViewDto.html" data-type="entity-link" >GetBalanceDueDatesViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetBalanceDueDatesViewDto-1.html" data-type="entity-link" >GetBalanceDueDatesViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getBarcodeById.html" data-type="entity-link" >getBarcodeById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getBarcodeById-1.html" data-type="entity-link" >getBarcodeById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCustomerOpeningBalanceDto.html" data-type="entity-link" >GetCustomerOpeningBalanceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCustomerOpeningBalanceViewDto.html" data-type="entity-link" >GetCustomerOpeningBalanceViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCustomerOpeningDetailsDto.html" data-type="entity-link" >GetCustomerOpeningDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetCustomerOpeningDetailsViewDto.html" data-type="entity-link" >GetCustomerOpeningDetailsViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetEmployeeById.html" data-type="entity-link" >GetEmployeeById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetItemById.html" data-type="entity-link" >GetItemById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetItemById-1.html" data-type="entity-link" >GetItemById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetItemCategoryDto.html" data-type="entity-link" >GetItemCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetItemCategoryDto-1.html" data-type="entity-link" >GetItemCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetItemUom.html" data-type="entity-link" >GetItemUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetItemUom-1.html" data-type="entity-link" >GetItemUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetJournalEntryByIdDto.html" data-type="entity-link" >GetJournalEntryByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetLastYearInfoDto.html" data-type="entity-link" >GetLastYearInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetLevelsDto.html" data-type="entity-link" >GetLevelsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetLineDropDownById.html" data-type="entity-link" >GetLineDropDownById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetLineDropDownById-1.html" data-type="entity-link" >GetLineDropDownById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetOpenFinancialPeriodDate.html" data-type="entity-link" >GetOpenFinancialPeriodDate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPaymentMethodByIdDto.html" data-type="entity-link" >GetPaymentMethodByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPaymentMethodByIdDto-1.html" data-type="entity-link" >GetPaymentMethodByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getpaymentMethodCommissionData.html" data-type="entity-link" >getpaymentMethodCommissionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getpaymentMethodCommissionData-1.html" data-type="entity-link" >getpaymentMethodCommissionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPaymentTermById.html" data-type="entity-link" >GetPaymentTermById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPaymentTermById-1.html" data-type="entity-link" >GetPaymentTermById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPaymentTermLineById.html" data-type="entity-link" >GetPaymentTermLineById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPaymentTermLineById-1.html" data-type="entity-link" >GetPaymentTermLineById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetTreasuryDtoById.html" data-type="entity-link" >GetTreasuryDtoById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetTreasuryDtoById-1.html" data-type="entity-link" >GetTreasuryDtoById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getUomByItemId.html" data-type="entity-link" >getUomByItemId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getUomByItemId-1.html" data-type="entity-link" >getUomByItemId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetUserbyid.html" data-type="entity-link" >GetUserbyid</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetVendorById.html" data-type="entity-link" >GetVendorById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetVendorById-1.html" data-type="entity-link" >GetVendorById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetVendorById-2.html" data-type="entity-link" >GetVendorById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getVendorOpeningBalanceByID.html" data-type="entity-link" >getVendorOpeningBalanceByID</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetVendorOpeningBalanceViewDto.html" data-type="entity-link" >GetVendorOpeningBalanceViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetVendorOpeningDetailsViewDto.html" data-type="entity-link" >GetVendorOpeningDetailsViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetWarehouseById.html" data-type="entity-link" >GetWarehouseById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetWarehouseById-1.html" data-type="entity-link" >GetWarehouseById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetWarehouseItems.html" data-type="entity-link" >GetWarehouseItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetWarehouseList.html" data-type="entity-link" >GetWarehouseList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetWarehouseList-1.html" data-type="entity-link" >GetWarehouseList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetWarehouseList-2.html" data-type="entity-link" >GetWarehouseList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetWarehouseList-3.html" data-type="entity-link" >GetWarehouseList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HelpPageDetails.html" data-type="entity-link" >HelpPageDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HelpPagesList.html" data-type="entity-link" >HelpPagesList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HomeHelpPageModel.html" data-type="entity-link" >HomeHelpPageModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IApp.html" data-type="entity-link" >IApp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttrributeDifinition.html" data-type="entity-link" >IAttrributeDifinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttrributeDifinition-1.html" data-type="entity-link" >IAttrributeDifinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttrributeDifinitionItemAttribute.html" data-type="entity-link" >IAttrributeDifinitionItemAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttrributeDifinitionItemAttribute-1.html" data-type="entity-link" >IAttrributeDifinitionItemAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttrributeDifinitionResult.html" data-type="entity-link" >IAttrributeDifinitionResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAttrributeDifinitionResult-1.html" data-type="entity-link" >IAttrributeDifinitionResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContent.html" data-type="entity-link" >IContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconUserModel.html" data-type="entity-link" >IconUserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateAccount.html" data-type="entity-link" >ICreateAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEngage.html" data-type="entity-link" >IEngage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnvironment.html" data-type="entity-link" >IEnvironment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFooter.html" data-type="entity-link" >IFooter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGeneral.html" data-type="entity-link" >IGeneral</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHeader.html" data-type="entity-link" >IHeader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IIllustrations.html" data-type="entity-link" >IIllustrations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IImageInputOptions.html" data-type="entity-link" >IImageInputOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IImageInputQueries.html" data-type="entity-link" >IImageInputQueries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IinvoiceDto.html" data-type="entity-link" >IinvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILayout.html" data-type="entity-link" >ILayout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILayoutComponent.html" data-type="entity-link" >ILayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILayoutCSSClasses.html" data-type="entity-link" >ILayoutCSSClasses</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILayoutHTMLAttributes.html" data-type="entity-link" >ILayoutHTMLAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMain.html" data-type="entity-link" >IMain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMegaMenu.html" data-type="entity-link" >IMegaMenu</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitedUserDto.html" data-type="entity-link" >InvitedUserDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceDetail.html" data-type="entity-link" >InvoiceDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceDetail-1.html" data-type="entity-link" >InvoiceDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceTracking.html" data-type="entity-link" >InvoiceTracking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceTracking-1.html" data-type="entity-link" >InvoiceTracking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOperationalTag.html" data-type="entity-link" >IOperationalTag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOperationalTag-1.html" data-type="entity-link" >IOperationalTag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOperationalTagResult.html" data-type="entity-link" >IOperationalTagResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOperationalTagResult-1.html" data-type="entity-link" >IOperationalTagResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPageLoader.html" data-type="entity-link" >IPageLoader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPageTitle.html" data-type="entity-link" >IPageTitle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPasswordMeterOptions.html" data-type="entity-link" >IPasswordMeterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPasswordMeterQueries.html" data-type="entity-link" >IPasswordMeterQueries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollTop.html" data-type="entity-link" >IScrollTop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollTopOptions.html" data-type="entity-link" >IScrollTopOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchOptions.html" data-type="entity-link" >ISearchOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchQueries.html" data-type="entity-link" >ISearchQueries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISidebar.html" data-type="entity-link" >ISidebar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISidebarPanel.html" data-type="entity-link" >ISidebarPanel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStepperOptions.html" data-type="entity-link" >IStepperOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISwapperOptions.html" data-type="entity-link" >ISwapperOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISwapperQueries.html" data-type="entity-link" >ISwapperQueries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAccounting.html" data-type="entity-link" >ItemAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAccounting-1.html" data-type="entity-link" >ItemAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttribute.html" data-type="entity-link" >ItemAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttribute-1.html" data-type="entity-link" >ItemAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttribute-2.html" data-type="entity-link" >ItemAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeDiffinitionList.html" data-type="entity-link" >ItemAttributeDiffinitionList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeDiffinitionList-1.html" data-type="entity-link" >ItemAttributeDiffinitionList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeDto.html" data-type="entity-link" >ItemAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeDto-1.html" data-type="entity-link" >ItemAttributeDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeGroup.html" data-type="entity-link" >ItemAttributeGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeGroup-1.html" data-type="entity-link" >ItemAttributeGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeGroupDetail.html" data-type="entity-link" >ItemAttributeGroupDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAttributeGroupDetail-1.html" data-type="entity-link" >ItemAttributeGroupDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/itemAttributeValues.html" data-type="entity-link" >itemAttributeValues</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/itemAttributeValues-1.html" data-type="entity-link" >itemAttributeValues</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/itemAttributeValuesByID.html" data-type="entity-link" >itemAttributeValuesByID</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/itemAttributeValuesByID-1.html" data-type="entity-link" >itemAttributeValuesByID</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/itemDefinitionDto.html" data-type="entity-link" >itemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/itemDefinitionDto-1.html" data-type="entity-link" >itemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemDto.html" data-type="entity-link" >ItemDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemDto-1.html" data-type="entity-link" >ItemDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemDto-2.html" data-type="entity-link" >ItemDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsUom.html" data-type="entity-link" >ItemsUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsUom-1.html" data-type="entity-link" >ItemsUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsUom-2.html" data-type="entity-link" >ItemsUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsUom-3.html" data-type="entity-link" >ItemsUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsUomList.html" data-type="entity-link" >ItemsUomList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsUomList-1.html" data-type="entity-link" >ItemsUomList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsUomList-2.html" data-type="entity-link" >ItemsUomList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemUom.html" data-type="entity-link" >ItemUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemUom-1.html" data-type="entity-link" >ItemUom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IToolbar.html" data-type="entity-link" >IToolbar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Iuom.html" data-type="entity-link" >Iuom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Iuom-1.html" data-type="entity-link" >Iuom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IuomResult.html" data-type="entity-link" >IuomResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IuomResult-1.html" data-type="entity-link" >IuomResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalEntryFormValue.html" data-type="entity-link" >JournalEntryFormValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalEntryLineDto.html" data-type="entity-link" >JournalEntryLineDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalEntryLineFormValue.html" data-type="entity-link" >JournalEntryLineFormValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalEntryLineViewDto.html" data-type="entity-link" >JournalEntryLineViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalEntryTypeCountDto.html" data-type="entity-link" >JournalEntryTypeCountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalEntryViewDto.html" data-type="entity-link" >JournalEntryViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalLineDropdownDto.html" data-type="entity-link" >JournalLineDropdownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JournalStatusDto.html" data-type="entity-link" >JournalStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LanguageFlag.html" data-type="entity-link" >LanguageFlag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LatestItem.html" data-type="entity-link" >LatestItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LatestItems.html" data-type="entity-link" >LatestItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LatestItems-1.html" data-type="entity-link" >LatestItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LatestItems-2.html" data-type="entity-link" >LatestItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LegalInfo.html" data-type="entity-link" >LegalInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LegalInfo-1.html" data-type="entity-link" >LegalInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LegalInfo-2.html" data-type="entity-link" >LegalInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LicenceInfo.html" data-type="entity-link" >LicenceInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/listAddLevelsDto.html" data-type="entity-link" >listAddLevelsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Locale.html" data-type="entity-link" >Locale</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginModel.html" data-type="entity-link" >LoginModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogModel.html" data-type="entity-link" >LogModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupDto.html" data-type="entity-link" >lookupDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupDto-1.html" data-type="entity-link" >lookupDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupDto-2.html" data-type="entity-link" >lookupDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupDto-3.html" data-type="entity-link" >lookupDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupsListDto.html" data-type="entity-link" >lookupsListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupsListDto-1.html" data-type="entity-link" >lookupsListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupsListDto-2.html" data-type="entity-link" >lookupsListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/lookupsListDto-3.html" data-type="entity-link" >lookupsListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/mappedData.html" data-type="entity-link" >mappedData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuModule.html" data-type="entity-link" >MenuModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuOptions.html" data-type="entity-link" >MenuOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageModel.html" data-type="entity-link" >MessageModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModalConfig.html" data-type="entity-link" >ModalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Money.html" data-type="entity-link" >Money</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OffsetModel.html" data-type="entity-link" >OffsetModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OperationalStockIn.html" data-type="entity-link" >OperationalStockIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OperationalStockIn-1.html" data-type="entity-link" >OperationalStockIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageInfoResult.html" data-type="entity-link" >PageInfoResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageLink.html" data-type="entity-link" >PageLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationVm.html" data-type="entity-link" >PaginationVm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/parentAccountDto.html" data-type="entity-link" >parentAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/parentCostCenter.html" data-type="entity-link" >parentCostCenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentInDetailViewDto.html" data-type="entity-link" >PaymentInDetailViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/paymentMethodCommissionData.html" data-type="entity-link" >paymentMethodCommissionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/paymentMethodCommissionData-1.html" data-type="entity-link" >paymentMethodCommissionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentOutDetailViewDto.html" data-type="entity-link" >PaymentOutDetailViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Period.html" data-type="entity-link" >Period</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Period-1.html" data-type="entity-link" >Period</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PermissionTreeNode.html" data-type="entity-link" >PermissionTreeNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/priceList.html" data-type="entity-link" >priceList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PricelistDto.html" data-type="entity-link" >PricelistDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseSubdomainDto.html" data-type="entity-link" >ResponseSubdomainDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseSubdomainListDto.html" data-type="entity-link" >ResponseSubdomainListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseSubdomainListDto-1.html" data-type="entity-link" >ResponseSubdomainListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultModel.html" data-type="entity-link" >ResultModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RevenueStream.html" data-type="entity-link" >RevenueStream</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouteFilter.html" data-type="entity-link" >RouteFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RowData.html" data-type="entity-link" >RowData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollOptions.html" data-type="entity-link" >ScrollOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchField.html" data-type="entity-link" >SearchField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectIconDto.html" data-type="entity-link" >SelectIconDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SideMenuModel.html" data-type="entity-link" >SideMenuModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleDropDown.html" data-type="entity-link" >SimpleDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleDropDown-1.html" data-type="entity-link" >SimpleDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortTableEXport.html" data-type="entity-link" >SortTableEXport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StickyOptions.html" data-type="entity-link" >StickyOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInDetail.html" data-type="entity-link" >StockInDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInDetail-1.html" data-type="entity-link" >StockInDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInDto.html" data-type="entity-link" >StockInDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInDto-1.html" data-type="entity-link" >StockInDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInTracking.html" data-type="entity-link" >StockInTracking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInTracking-1.html" data-type="entity-link" >StockInTracking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockOutDetails.html" data-type="entity-link" >StockOutDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockOutDetails-1.html" data-type="entity-link" >StockOutDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockOutDto.html" data-type="entity-link" >StockOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockOutDto-1.html" data-type="entity-link" >StockOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Subdomain.html" data-type="entity-link" >Subdomain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubdomainAppDto.html" data-type="entity-link" >SubdomainAppDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/subdomainDetailsDto.html" data-type="entity-link" >subdomainDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubDomainInfo.html" data-type="entity-link" >SubDomainInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubdomainModuleDto.html" data-type="entity-link" >SubdomainModuleDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/subscriptionDetailsDto.html" data-type="entity-link" >subscriptionDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscriptionDto.html" data-type="entity-link" >SubscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubsidiaryDto.html" data-type="entity-link" >SubsidiaryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableData.html" data-type="entity-link" >TableData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDropDownDto.html" data-type="entity-link" >TagDropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDropDownDto-1.html" data-type="entity-link" >TagDropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDropDownDto-2.html" data-type="entity-link" >TagDropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDropDownDto-3.html" data-type="entity-link" >TagDropDownDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDto.html" data-type="entity-link" >TagDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDto-1.html" data-type="entity-link" >TagDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDto-2.html" data-type="entity-link" >TagDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxDto.html" data-type="entity-link" >TaxDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxDto-1.html" data-type="entity-link" >TaxDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxGroupDropDown.html" data-type="entity-link" >TaxGroupDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxGroupDto.html" data-type="entity-link" >TaxGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TenantLicenseDto.html" data-type="entity-link" >TenantLicenseDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToasterModel.html" data-type="entity-link" >ToasterModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToggleOptions.html" data-type="entity-link" >ToggleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenModel.html" data-type="entity-link" >TokenModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenModel-1.html" data-type="entity-link" >TokenModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenRequestViewModel.html" data-type="entity-link" >TokenRequestViewModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasureDefinitionDto.html" data-type="entity-link" >TreasureDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasureDefinitionDto-1.html" data-type="entity-link" >TreasureDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasuriesPaymentMethod.html" data-type="entity-link" >TreasuriesPaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasuriesPaymentMethod-1.html" data-type="entity-link" >TreasuriesPaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasuryDropDown.html" data-type="entity-link" >TreasuryDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasuryDropDown-1.html" data-type="entity-link" >TreasuryDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/treasuryStatementDto.html" data-type="entity-link" >treasuryStatementDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasuryStatementfilterDto.html" data-type="entity-link" >TreasuryStatementfilterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasuryStatmentTransactionDto.html" data-type="entity-link" >TreasuryStatmentTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreasuryViewDto.html" data-type="entity-link" >TreasuryViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UoM.html" data-type="entity-link" >UoM</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UoM-1.html" data-type="entity-link" >UoM</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UOMCategoryDto.html" data-type="entity-link" >UOMCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UOMCategoryDto-1.html" data-type="entity-link" >UOMCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UomCodeLookup.html" data-type="entity-link" >UomCodeLookup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UomCodeLookup-1.html" data-type="entity-link" >UomCodeLookup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UomData.html" data-type="entity-link" >UomData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UomDefault.html" data-type="entity-link" >UomDefault</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UomDefault-1.html" data-type="entity-link" >UomDefault</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UonViewDto.html" data-type="entity-link" >UonViewDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateCompanyHierarchyDto.html" data-type="entity-link" >UpdateCompanyHierarchyDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadFileResult.html" data-type="entity-link" >UploadFileResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userData.html" data-type="entity-link" >userData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData.html" data-type="entity-link" >UserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfoDto.html" data-type="entity-link" >UserInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfoModel.html" data-type="entity-link" >UserInfoModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserListResponse.html" data-type="entity-link" >UserListResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPermission.html" data-type="entity-link" >UserPermission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPermission-1.html" data-type="entity-link" >UserPermission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserState.html" data-type="entity-link" >UserState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/validationBuilder.html" data-type="entity-link" >validationBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationError.html" data-type="entity-link" >ValidationError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/variantGroupById.html" data-type="entity-link" >variantGroupById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/variantGroupById-1.html" data-type="entity-link" >variantGroupById</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorAccounting.html" data-type="entity-link" >VendorAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorAccounting-1.html" data-type="entity-link" >VendorAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorAccounting-2.html" data-type="entity-link" >VendorAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorAddress.html" data-type="entity-link" >VendorAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorAddress-1.html" data-type="entity-link" >VendorAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorAddress-2.html" data-type="entity-link" >VendorAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorCategory.html" data-type="entity-link" >VendorCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorCategory-1.html" data-type="entity-link" >VendorCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorCategory-2.html" data-type="entity-link" >VendorCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorCategoryDto.html" data-type="entity-link" >VendorCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorCategoryDto-1.html" data-type="entity-link" >VendorCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorCategoryDto-2.html" data-type="entity-link" >VendorCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/vendorDefinitionDto.html" data-type="entity-link" >vendorDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/vendorDefinitionDto-1.html" data-type="entity-link" >vendorDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/vendorDefinitionDto-2.html" data-type="entity-link" >vendorDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorDropDown.html" data-type="entity-link" >VendorDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorDropDown-1.html" data-type="entity-link" >VendorDropDown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorFinancial.html" data-type="entity-link" >VendorFinancial</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorFinancial-1.html" data-type="entity-link" >VendorFinancial</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorFinancial-2.html" data-type="entity-link" >VendorFinancial</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorInformation.html" data-type="entity-link" >VendorInformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorInformation-1.html" data-type="entity-link" >VendorInformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorInformation-2.html" data-type="entity-link" >VendorInformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorLegal.html" data-type="entity-link" >VendorLegal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorLegal-1.html" data-type="entity-link" >VendorLegal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorLegal-2.html" data-type="entity-link" >VendorLegal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorOpeningBalanceDetailsDto.html" data-type="entity-link" >VendorOpeningBalanceDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorOpeningBalanceDueDatesDto.html" data-type="entity-link" >VendorOpeningBalanceDueDatesDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendorOpeningBalanceListDto.html" data-type="entity-link" >VendorOpeningBalanceListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VieItemDefinitionDto.html" data-type="entity-link" >VieItemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VieItemDefinitionDto-1.html" data-type="entity-link" >VieItemDefinitionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/viewInvoiceObj.html" data-type="entity-link" >viewInvoiceObj</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPaymentInDetailCostCenterDto.html" data-type="entity-link" >ViewPaymentInDetailCostCenterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPaymentInDto.html" data-type="entity-link" >ViewPaymentInDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPaymentInMethodDetailDto.html" data-type="entity-link" >ViewPaymentInMethodDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPaymentOutDetailCostCenterDto.html" data-type="entity-link" >ViewPaymentOutDetailCostCenterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPaymentOutDto.html" data-type="entity-link" >ViewPaymentOutDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPaymentOutMethodDetailDto.html" data-type="entity-link" >ViewPaymentOutMethodDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewPortModel.html" data-type="entity-link" >ViewPortModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewWarehouse.html" data-type="entity-link" >ViewWarehouse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WarehouseAccount.html" data-type="entity-link" >WarehouseAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WarehouseAccount-1.html" data-type="entity-link" >WarehouseAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WarehouseAccountData.html" data-type="entity-link" >WarehouseAccountData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WarehouseAccountData-1.html" data-type="entity-link" >WarehouseAccountData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WarehousesTables.html" data-type="entity-link" >WarehousesTables</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WarehouseTransactionsDto.html" data-type="entity-link" >WarehouseTransactionsDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});