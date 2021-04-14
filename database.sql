create database giuakiiii;

create table `user` (
    username varchar(20) not null primary key,
    `password` varchar(100) not null,
    email varchar(50),
    phonenumber varchar(13)
);

create table `BenhNhan`(
    id int auto_increment not null primary key,
    `hovaten` varchar(255) character set utf8 collate utf8_unicode_ci not null,
    `tuoi` int,
    `gioitinh` boolean not null,
    `ngaynhapvien` datetime not null,
    `khoa` varchar(20) character set utf8 collate utf8_unicode_ci not null,
    `image` varchar(255),
    `ghichu` varchar(255) character set utf8 collate utf8_unicode_ci not null,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into `user`(username, `password`, email, phonenumber) values('sontran', '123', 'son@gmail.com', '123456789');

insert into `BenhNhan`(hovaten, tuoi, gioitinh, ngaynhapvien, khoa, `image`, ghichu) values('Trần Hữu Sơn', 22, True, '2020-04-22', 'Thần kinh', 'son.png', 'Bệnh nhân tâm thần nặng');