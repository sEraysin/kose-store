# Git geçmişini okuma ve geri dönme

`git status` değişen dosyaları, `git diff` henüz commit edilmemiş farkları, `git log --oneline` tamamlanmış adımları gösterir. Bir commit'i okumak için `git show COMMIT_KIMLIGI` kullanılır.

GitHub'a gönderilmiş bir commit yanlışsa geçmişi koruyarak tersine çevirmek için `git revert COMMIT_KIMLIGI` yapılır ve yeni commit push edilir. Henüz commit edilmemiş tek bir dosyayı geri almadan önce `git diff -- DOSYA` ile neyin kaybolacağını kontrol ederiz; ardından gerekliyse `git restore -- DOSYA` kullanırız.
