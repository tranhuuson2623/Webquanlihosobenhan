const fs = require('fs');

module.exports = {
    getAddBenhnhan: (req, res) => {
        res.render('add-player.ejs', {
            title: 'Welcome to PhanChiVuWeb'
            ,message: ''
        });
    },

    postAddBenhnhan: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let hovaten = req.body.hovaten;
        let tuoi = req.body.tuoi;
        let gioitinh = req.body.gioitinh;
        let ngaynhapvien = req.body.ngaynhapvien;
        let khoa = req.body.khoa;
        let ghichu = req.body.ghichu;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = image_name + '.' + fileExtension;


        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                // send the player's details to the database
                let query = "INSERT INTO `benhnhan`(`hovaten`, `tuoi`, `gioitinh`, `ngaynhapvien`, `khoa`, `image`, `ghichu`) VALUES ('"+hovaten+"',"+tuoi+","+gioitinh+",'"+ngaynhapvien+"','"+khoa+"','"+image_name+"','"+ghichu+"')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        }        
    },

    getEditBenhnhan: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `benhnhan` WHERE id = '" + id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: 'Edit  Player'
                ,player: result[0]
                ,message: ''
            });
        });
    },

    postEditBenhnhan: (req, res) => {
        let id = req.params.id;
        let hovaten = req.body.hovaten;
        let tuoi = req.body.tuoi;
        let gioitinh = req.body.gioitinh;
        let ngaynhapvien = req.body.ngaynhapvien;
        let khoa = req.body.khoa;
        let ghichu = req.body.ghichu;

        // let query = "UPDATE `benhnhan` SET `hovaten` = '" + hovaten + "', `tuoi` = '" + tuoi + "', `gioitinh` = '" + gioitinh + "', `ngaynhapvien` = '" + ngaynhapvien + "' WHERE `benhnhan`.`id` = '" + id + "'";
        let query = "UPDATE `benhnhan` SET `hovaten`='"+hovaten+"',`tuoi`="+tuoi+",`gioitinh`="+gioitinh+",`ngaynhapvien`='"+ngaynhapvien+"',`khoa`='"+khoa+"',`ghichu`='"+ghichu+"' where id='"+id+"'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    
    getDeleteBenhnhan: (req, res) => {
        let id = req.params.id;
        let getImageQuery = 'SELECT Image from `benhnhan` WHERE id = "' + id + '"';
        let deleteUserQuery = 'DELETE FROM benhnhan WHERE id = "' + id + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let Image = result[0].Image;

            fs.unlink(`public/assets/img/${Image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};
