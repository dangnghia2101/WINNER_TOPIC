"use strict";
(self["webpackChunktemplate_assets"] = self["webpackChunktemplate_assets"] || []).push([["src_www_pages_create-nft_index_jsx"],{

/***/ "./src/www/pages/create-nft/index.jsx":
/*!********************************************!*\
  !*** ./src/www/pages/create-nft/index.jsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const create_nft_elements_1 = __webpack_require__(/*! ./create-nft.elements */ "./src/www/pages/create-nft/create-nft.elements.js");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const icons_1 = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ipfs_1 = __webpack_require__(/*! ../../utilities/ipfs */ "./src/www/utilities/ipfs.js");
const principal_1 = __webpack_require__(/*! @dfinity/principal */ "./node_modules/@dfinity/principal/lib/esm/index.js");
const custom_axios_1 = __webpack_require__(/*! ../../utils/custom-axios */ "./src/www/utils/custom-axios.js");
const react_toastify_1 = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
const hooks_1 = __webpack_require__(/*! ../../hooks */ "./src/www/hooks/index.jsx");
const themes_1 = __webpack_require__(/*! ../../assets/themes */ "./src/www/assets/themes/index.js");
const nft_storage_1 = __webpack_require__(/*! nft.storage */ "./node_modules/nft.storage/src/lib.js");
const { Dragger } = antd_1.Upload;
const { Option } = antd_1.Select;
const react_2 = __webpack_require__(/*! @connect2ic/react */ "./node_modules/@connect2ic/react/dist/connect2ic-react.esm.js");
const IPFS_LINK = 'https://dweb.link/ipfs/';
function CreateNft(props) {
    const { isConnected, disconnect, activeProvider, isIdle, connect, isConnecting, principal, } = (0, react_2.useConnect)();
    const [fileImg, setFileImg] = (0, react_1.useState)('');
    const [listNFt, setListNFt] = (0, react_1.useState)([]);
    const [listAllNFt, setListAllNFt] = (0, react_1.useState)([]);
    const [superheroes, { loading, error }] = (0, react_2.useCanister)('superheroes');
    // upload image
    const [previewVisible, setPreviewVisible] = (0, react_1.useState)(false);
    const [previewImage, setPreviewImage] = (0, react_1.useState)('');
    const [previewTitle, setPreviewTitle] = (0, react_1.useState)('');
    const [fileList, setFileList] = (0, react_1.useState)([]);
    // when image upload
    (0, react_1.useEffect)(() => {
        if (fileImg[0]) {
            requestUpdate();
        }
    }, [fileImg]);
    const requestUpdate = () => {
        const resImg = fileList[0].thumbUrl;
        setFileImg(resImg);
    };
    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    (0, react_1.useEffect)(async () => {
        if (principal && superheroes) {
            getLIst();
        }
    }, [principal, superheroes]);
    const getListAll = async () => {
        console.log('SUPERHEROES_CANISTER_ID', "fij5p-siaaa-aaaai-acata-cai");
        const res = await superheroes.getAllTokens();
        console.log(res);
        const promise4all = Promise.all(res.map(function (el) {
            var _a;
            return (0, custom_axios_1.customAxios)((_a = el.metadata[0]) === null || _a === void 0 ? void 0 : _a.tokenUri);
        }));
        const resu = await promise4all;
        console.log(resu);
        setListAllNFt(resu);
    };
    const onFinish = async (values) => {
        (0, react_toastify_1.toast)('Minting NFT!!!');
        const cid = await ipfs_1.client.put([fileList[0].originFileObj]);
        console.log('===> cid ', cid);
        const nFile = new nft_storage_1.File([
            JSON.stringify({
                description: values === null || values === void 0 ? void 0 : values.description,
                name: values === null || values === void 0 ? void 0 : values.name,
                category: values === null || values === void 0 ? void 0 : values.category,
                school: values === null || values === void 0 ? void 0 : values.school,
                gpa: values === null || values === void 0 ? void 0 : values.gpa,
                chairman: values === null || values === void 0 ? void 0 : values.chairman,
                image: `${IPFS_LINK}${cid}/${fileList[0].originFileObj.name}`,
                timeCreate: Date.now(),
            }),
        ], `${values === null || values === void 0 ? void 0 : values.name}.json`, { type: 'text/plain' });
        const metadataCID = await ipfs_1.client.put([nFile]);
        console.log('===> metadataCID ', metadataCID);
        const res = await superheroes.mint(principal_1.Principal.fromText(values === null || values === void 0 ? void 0 : values.address), [
            { tokenUri: `${IPFS_LINK}${metadataCID}/${values === null || values === void 0 ? void 0 : values.name}.json` },
        ]);
        console.log('==== mint ', res);
        (0, react_toastify_1.toast)('Minted NFT success!!!');
        getLIst();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const getLIst = async () => {
        const res = await superheroes.getUserTokens(principal_1.Principal.fromText(principal));
        const promise4all = Promise.all(res.map(function (el) {
            var _a;
            return (0, custom_axios_1.customAxios)((_a = el.metadata[0]) === null || _a === void 0 ? void 0 : _a.tokenUri);
        }));
        const resu = await promise4all;
        console.log('getList ', resu);
        setListNFt(resu);
    };
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (react_1.default.createElement("div", null,
        react_1.default.createElement(icons_1.PlusOutlined, null),
        react_1.default.createElement("div", { style: {
                marginTop: 8,
            } }, "Upload image")));
    return (react_1.default.createElement(create_nft_elements_1.Container, { style: { backgroundColor: themes_1.themes.colors.background, paddingTop: 50 } },
        react_1.default.createElement(create_nft_elements_1.Wrapper, { style: {
                backgroundColor: themes_1.themes.colors.background_box,
                borderRadius: 15,
                margin: 'auto',
                width: '30%',
                padding: 20,
                marginTop: 20,
            } },
            react_1.default.createElement("div", { style: { fontSize: 20, color: 'white', fontWeight: 'bold' } }, "User manual"),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 1"),
                react_1.default.createElement("div", { style: { color: 'white' } }, "Upload image: Here is a photo of an NFT certified person.")),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 2"),
                react_1.default.createElement("div", { style: { color: 'white' } }, "Enter degree name: this is name of degree.")),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 3"),
                react_1.default.createElement("div", { style: { color: 'white' } }, "Enter degree description: Provide all information about degree.")),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 4"),
                react_1.default.createElement("div", { style: { color: 'white' } },
                    "Paste public key: This is the wallet address of the nft recipient, after the image is minted.",
                    '',
                    react_1.default.createElement("a", { style: { color: 'blueviolet' }, href: 'https://plugwallet.ooo/' },
                        ' ',
                        "How to create a wallet"))),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 5"),
                react_1.default.createElement("div", { style: { color: 'white' } }, "Choose degree category: this is category of degree")),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 6"),
                react_1.default.createElement("div", { style: { color: 'white' } }, "Choose degree chool: Graduate diploma certification facility")),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 7"),
                react_1.default.createElement("div", { style: { color: 'white' } }, "Choose degree's gpa: Student's GPA")),
            react_1.default.createElement("div", { style: {
                    backgroundColor: themes_1.themes.colors.background,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                } },
                react_1.default.createElement("div", { style: { color: 'white', fontWeight: 'bold', fontSize: 14 } }, "Step 8"),
                react_1.default.createElement("div", { style: { color: 'white' } }, "Enter chairman name: This is the name of the director of the facility that issued the diploma"))),
        react_1.default.createElement(create_nft_elements_1.Wrapper, { style: {
                backgroundColor: themes_1.themes.colors.background_box,
                borderRadius: 15,
                margin: 'auto',
                width: '50%',
                padding: 20,
                marginBottom: 50,
            } },
            react_1.default.createElement(create_nft_elements_1.Title, { style: { color: 'white' } }, "Create Dgree NFT"),
            react_1.default.createElement(create_nft_elements_1.Required, { style: { color: 'white' } },
                react_1.default.createElement(create_nft_elements_1.RedIcon, { style: { color: 'white' } }, "*"),
                " Required fields"),
            react_1.default.createElement(create_nft_elements_1.BodyWrapper, null,
                react_1.default.createElement(antd_1.Form, { name: 'basic', onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: 'off' },
                    react_1.default.createElement(create_nft_elements_1.FormWrapper, null,
                        react_1.default.createElement(create_nft_elements_1.FormItem, null,
                            react_1.default.createElement(antd_1.Form.Item, { name: 'image' },
                                react_1.default.createElement(antd_1.Upload
                                // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                , { 
                                    // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                    listType: 'picture-card', fileList: fileList, onPreview: handlePreview, onChange: handleChange, style: {
                                        flexDirection: 'row',
                                        justifyItems: 'center',
                                        display: 'flex',
                                    } }, fileList.length >= 8 ? null : uploadButton),
                                react_1.default.createElement(antd_1.Modal, { visible: previewVisible, title: previewTitle, footer: null, onCancel: handleCancel, style: { width: 700, height: 400 } },
                                    react_1.default.createElement("img", { alt: 'example', style: {
                                            width: '100%',
                                            height: '100%',
                                        }, src: previewImage })))),
                        react_1.default.createElement("div", { style: { color: 'white', fontSize: 14 } }, "Name degree"),
                        react_1.default.createElement(antd_1.Form.Item, { name: 'name', rules: [{ required: true, message: 'Please input NFT name!' }] },
                            react_1.default.createElement(antd_1.Input, { width: '100%', size: 'large', placeholder: 'Name of degree' })),
                        react_1.default.createElement("div", { style: { color: 'white', fontSize: 14 } }, "Description"),
                        react_1.default.createElement(antd_1.Form.Item, { name: 'description' },
                            react_1.default.createElement(antd_1.Input, { size: 'large', placeholder: 'Provide a detailed description of degree' })),
                        react_1.default.createElement("div", { style: { color: 'white', fontSize: 14 } }, "Adress wallet"),
                        react_1.default.createElement(antd_1.Form.Item, { name: 'address' },
                            react_1.default.createElement(antd_1.Input, { size: 'large', placeholder: 'Pass address wallet' })),
                        react_1.default.createElement("div", { style: {
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            } },
                            react_1.default.createElement(antd_1.Form.Item, { name: 'category' },
                                react_1.default.createElement(antd_1.Select, { defaultValue: 'Category', size: 'large', style: { width: 200, marginBottom: 20, borderRadius: 10 } },
                                    react_1.default.createElement(Option, { value: '1' }, "Diploma"),
                                    react_1.default.createElement(Option, { value: '2' }, "Certificate"),
                                    react_1.default.createElement(Option, { value: '3' }, "Merit"))),
                            react_1.default.createElement(antd_1.Form.Item, { name: 'school' },
                                react_1.default.createElement(antd_1.Select, { defaultValue: 'School', size: 'large', style: { width: 200, marginBottom: 20, borderRadius: 10 } },
                                    react_1.default.createElement(Option, { value: '1' }, "FPT Polytechnic"),
                                    react_1.default.createElement(Option, { value: '2' }, "FPT University"),
                                    react_1.default.createElement(Option, { value: '3' }, "Uni of Greenwich")))),
                        react_1.default.createElement("div", { style: { color: 'white', fontSize: 14 } }, "Enter GPA"),
                        react_1.default.createElement(antd_1.Form.Item, { name: 'gpa' },
                            react_1.default.createElement(antd_1.Input, { size: 'large', placeholder: 'Enter GPA' })),
                        react_1.default.createElement("div", { style: { color: 'white', fontSize: 14 } }, "Enter name of chairman"),
                        react_1.default.createElement(antd_1.Form.Item, { name: 'chairman' },
                            react_1.default.createElement(antd_1.Input, { size: 'large', placeholder: 'Name of chairman' })),
                        react_1.default.createElement(create_nft_elements_1.FormItem, null,
                            react_1.default.createElement(antd_1.Form.Item, null,
                                react_1.default.createElement(antd_1.Button, { type: 'primary', htmlType: 'submit', size: 'large', style: { width: 200, marginTop: 20 } }, "Submit")))))))));
}
exports["default"] = (0, hooks_1.withContext)(CreateNft);


/***/ }),

/***/ "./src/www/pages/create-nft/create-nft.elements.js":
/*!*********************************************************!*\
  !*** ./src/www/pages/create-nft/create-nft.elements.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => (/* binding */ Container),
/* harmony export */   "Wrapper": () => (/* binding */ Wrapper),
/* harmony export */   "Title": () => (/* binding */ Title),
/* harmony export */   "Required": () => (/* binding */ Required),
/* harmony export */   "FormWrapper": () => (/* binding */ FormWrapper),
/* harmony export */   "RedIcon": () => (/* binding */ RedIcon),
/* harmony export */   "BodyWrapper": () => (/* binding */ BodyWrapper),
/* harmony export */   "FormItem": () => (/* binding */ FormItem),
/* harmony export */   "FormItemName": () => (/* binding */ FormItemName),
/* harmony export */   "FormItemDesc": () => (/* binding */ FormItemDesc)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


const Container = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: flex;
    flex-direction: column;
`

const Title = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
`

const Required = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    font-size: 14px;
    margin-bottom: 20px;
`

const FormWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: flex;
    flex-direction: column;
`

const RedIcon = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].span`
    color: red;
`

const BodyWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    display: flex;
    flex-direction: column;
`

const FormItem = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    margin: auto;
`

const FormItemName = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    font-size: 16px;
    font-weight: bold;
`

const FormItemDesc = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div`
    font-size: 14px;
    margin-bottom: 10px;
`

/***/ })

}]);
//# sourceMappingURL=src_www_pages_create-nft_index_jsx.index.js.map