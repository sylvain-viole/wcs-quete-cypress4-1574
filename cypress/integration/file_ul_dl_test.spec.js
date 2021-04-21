import PicturePage from "../pages/PicturePage";
import PostPage from "../pages/PostPage";
import UploadPage from "../pages/UploadPage";

const url = "https://imgur.com/upload";
const uploadPage = new UploadPage();
const postPage = new PostPage();
const picturePage = new PicturePage()


describe('File UL and DL tests', () => {

    before(() => {
        cy.visit(url)
    })

    it('Should upload file', () => {
        cy.get(uploadPage.uploadLink).attachFile('fileToUpload.png')
        cy.get(uploadPage.toastMessage).should('contain.text', 'Upload Complete!')
    })

    it('Should display picture page when visiting picture link', () => {
        cy.get(postPage.hiddenBtn).click();
        cy.get(postPage.linkInput).then(url => {
            cy.request(url.val()).then(response => {
                expect(response.status).to.eql(200)
            })
            cy.visit(url.val())
        })
    })

    it('Should download picture to local folder', () => {
        cy.get(picturePage.imgPlaceholder).invoke('attr', 'src').then(src => {
            cy.log(src)
            cy.downloadFile(src, 'download', 'wcspic.png')
        })
    })
})
